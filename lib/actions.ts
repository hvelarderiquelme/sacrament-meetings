"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMeetingInDb,
  updateMeetingInDb,
  deleteMeetingFromDb,
} from "./meetings-db";
import { Speaker, BusinessItem } from "./types";

const HymnSchema = z.object({
  number: z.coerce.number().int().positive("Hymn number must be a positive number"),
  title: z.string().trim().min(1, "Hymn title is required"),
});

const SpeakerSchema = z.object({
  name: z.string().trim().min(1),
  topic: z.string().trim(),
  type: z.enum(["speaker", "musical-number"]),
});

const BusinessItemSchema = z.object({
  description: z.string().trim(),
  name: z.string().trim(),
  calling: z.string().trim().optional(),
  officiator: z.string().trim().optional(),
});

const MeetingFormSchema = z.object({
  date: z.string().min(1, "Meeting date is required"),
  meetingType: z.enum(["regular", "testimony", "stake", "general", "special"]),
  presiding: z.string().trim().min(1, "Presiding officer is required"),
  conducting: z.string().trim().min(1, "Conducting officer is required"),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required"),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required"),
  stakeBusiness: z.boolean(),
  openingHymn: HymnSchema,
  sacramentHymn: HymnSchema,
  closingHymn: HymnSchema,
  announcements: z.array(z.string()),
  speakers: z.array(SpeakerSchema),
  wardBusiness: z.array(BusinessItemSchema),
});

// Helper to extract and pack raw FormData before Zod safeParse
function parseRawMeetingFormData(formData: FormData) {
  const announcements = (formData.getAll("announcements") as string[])
    .map((item) => item.trim())
    .filter((item) => item !== "");

  const speakerNames = formData.getAll("speakerName") as string[];
  const speakerTopics = formData.getAll("speakerTopic") as string[];
  const speakerTypes = formData.getAll("speakerType") as ("speaker" | "musical-number")[];

  const speakers: Speaker[] = speakerNames
    .map((name, index) => ({
      name: name.trim(),
      topic: (speakerTopics[index] || "").trim(),
      type: speakerTypes[index] || "speaker",
    }))
    .filter((speaker) => speaker.name !== "");

  const businessDescriptions = formData.getAll("businessDescription") as string[];
  const businessNames = formData.getAll("businessName") as string[];
  const businessCallings = formData.getAll("businessCalling") as string[];
  const businessOfficiators = formData.getAll("businessOfficiator") as string[];

  const wardBusiness: BusinessItem[] = businessNames
    .map((name, index) => ({
      description: (businessDescriptions[index] || "").trim(),
      name: name.trim(),
      calling: businessCallings[index]?.trim() || undefined,
      officiator: businessOfficiators[index]?.trim() || undefined,
    }))
    .filter((item) => item.name !== "" || item.description !== "");

  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    stakeBusiness: formData.get("stakeBusiness") === "on",
    openingHymn: {
      number: formData.get("openingHymnNumber"),
      title: formData.get("openingHymnTitle"),
    },
    sacramentHymn: {
      number: formData.get("sacramentHymnNumber"),
      title: formData.get("sacramentHymnTitle"),
    },
    closingHymn: {
      number: formData.get("closingHymnNumber"),
      title: formData.get("closingHymnTitle"),
    },
    announcements,
    speakers,
    wardBusiness,
  };
}

export async function createMeeting(formData: FormData) {
  const rawData = parseRawMeetingFormData(formData);
  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    throw new Error("Invalid meeting form fields. Please check your inputs.");
  }

    try {
    await createMeetingInDb(validatedFields.data);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      throw new Error(`A meeting on ${validatedFields.data.date} already exists.`);
    }
    throw new Error("Database Error: Failed to create meeting.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

// Alias kept for backwards compatibility if any file still imports CreateMeeting
export const CreateMeeting = createMeeting;

export async function updateMeeting(id: number, formData: FormData) {
  const rawData = parseRawMeetingFormData(formData);
  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    throw new Error("Invalid meeting form fields. Please check your inputs.");
  }

   try {
    await updateMeetingInDb(id, validatedFields.data);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      throw new Error(`Another meeting already exists on ${validatedFields.data.date}.`);
    }
    throw new Error("Database Error: Failed to update meeting.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeeting(id: number) {
  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to delete meeting.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
