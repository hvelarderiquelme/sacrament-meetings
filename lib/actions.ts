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

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    announcements?: string[];
    speakers?: string[];
    wardBusiness?: string[];
  };
  message?: string | null;
};

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

// Flat field keys match form inputs so fieldErrors maps 1-to-1 with UI fields
const MeetingFormSchema = z.object({
  date: z.string().min(1, "Please select a meeting date."),
  meetingType: z.enum(["regular", "testimony", "stake", "general", "special"]),
  presiding: z.string().trim().min(1, "Presiding officer is required."),
  conducting: z.string().trim().min(1, "Conducting officer is required."),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
  stakeBusiness: z.boolean(),
   openingHymnNumber: z.coerce
    .number({ error: "Opening hymn must be a number." })
    .int("Opening hymn must be a whole number.")
    .positive("Opening hymn must be greater than 0."),
  openingHymnTitle: z.string().trim().min(1, "Opening hymn title is required."),
  sacramentHymnNumber: z.coerce
    .number({ error: "Sacrament hymn must be a number." })
    .int("Sacrament hymn must be a whole number.")
    .positive("Sacrament hymn must be greater than 0."),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, "Sacrament hymn title is required."),
  closingHymnNumber: z.coerce
    .number({ error: "Closing hymn must be a number." })
    .int("Closing hymn must be a whole number.")
    .positive("Closing hymn must be greater than 0."),
  closingHymnTitle: z.string().trim().min(1, "Closing hymn title is required."),
  announcements: z.array(z.string()),
  speakers: z.array(SpeakerSchema),
  wardBusiness: z.array(BusinessItemSchema),
});

function parseRawMeetingFormData(formData: FormData) {
  const announcements = (formData.getAll("announcements") as string[])
    .map((item) => item.trim())
    .filter((item) => item !== "");

  const speakerNames = formData.getAll("speakerName") as string[];
  const speakerTopics = formData.getAll("speakerTopic") as string[];
  const speakerTypes = formData.getAll("speakerType") as (
    | "speaker"
    | "musical-number"
  )[];

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
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    announcements,
    speakers,
    wardBusiness,
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const rawData = parseRawMeetingFormData(formData);
  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create meeting.",
    };
  }

  const d = validatedFields.data;

  try {
    await createMeetingInDb({
      date: d.date,
      meetingType: d.meetingType,
      presiding: d.presiding,
      conducting: d.conducting,
      openingPrayer: d.openingPrayer,
      closingPrayer: d.closingPrayer,
      stakeBusiness: d.stakeBusiness,
      openingHymn: { number: d.openingHymnNumber, title: d.openingHymnTitle },
      sacramentHymn: {
        number: d.sacramentHymnNumber,
        title: d.sacramentHymnTitle,
      },
      closingHymn: { number: d.closingHymnNumber, title: d.closingHymnTitle },
      announcements: d.announcements,
      speakers: d.speakers,
      wardBusiness: d.wardBusiness,
    });
  } catch (error) {
    console.error("Failed to create meeting:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      return {
        errors: {
          date: [`A sacrament meeting for ${d.date} already exists.`],
        },
        message: "Duplicate meeting date. Please select a different date.",
      };
    }
    return {
      message: "Database Error: Failed to create meeting.",
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const rawData = parseRawMeetingFormData(formData);
  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update meeting.",
    };
  }

  const d = validatedFields.data;

  try {
    await updateMeetingInDb(id, {
      date: d.date,
      meetingType: d.meetingType,
      presiding: d.presiding,
      conducting: d.conducting,
      openingPrayer: d.openingPrayer,
      closingPrayer: d.closingPrayer,
      stakeBusiness: d.stakeBusiness,
      openingHymn: { number: d.openingHymnNumber, title: d.openingHymnTitle },
      sacramentHymn: {
        number: d.sacramentHymnNumber,
        title: d.sacramentHymnTitle,
      },
      closingHymn: { number: d.closingHymnNumber, title: d.closingHymnTitle },
      announcements: d.announcements,
      speakers: d.speakers,
      wardBusiness: d.wardBusiness,
    });
  } catch (error) {
    console.error(`Failed to update meeting ${id}:`, error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "23505"
    ) {
      return {
        errors: {
          date: [`Another sacrament meeting already exists on ${d.date}.`],
        },
        message: "Duplicate meeting date. Please select a different date.",
      };
    }
    return {
      message: "Database Error: Failed to update meeting.",
    };
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeeting(id: number) {
  try {
    await deleteMeetingFromDb(id);
  } catch (error) {
    console.error(`Failed to delete meeting ${id}:`, error);
    throw new Error("Database Error: Failed to delete meeting.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}
