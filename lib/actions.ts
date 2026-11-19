"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Hymn, 
         MeetingType,
         Speaker,
         BusinessItem
} from "./types";

export async function CreateMeeting(formData: FormData) {
    const date = formData.get("date") as string;
    const meetingType = formData.get("meetingType") as MeetingType;
    const presiding = formData.get("presiding") as string;
    const conducting = formData.get("conducting") as string;
    const openingPrayer = formData.get("openingPrayer") as string;
    const closingPrayer = formData.get("closingPrayer") as string;

    //Checkboxes in FormData return 'on' if checked, or null if unchecked
    const stakeBusiness = formData.get("stakeBusiness") === 'on';

    //Pack a single nested object (Hymn)
    const openingHymn: Hymn = {
        number: Number(formData.get("openingHymnNumber")),
        title: formData.get("openingHymnTitle") as string,
    };

    const sacramentHymn = {
        number: Number(formData.get("sacramentHymnNumber")),
        title: formData.get("sacramentHymnTitle") as string,
    };

    const closingHymn = {
        number: Number(formData.get("closingHymnNumber")),
        title: formData.get("closingHymnTitle") as string,
    };

    //Grabs all inputs with name="announcements" as a string array
    const announcements = (formData.getAll("announcements") as string[])
    .map((item) => item.trim())
    .filter((item) => item !== "");

    //Grabs Speakers information
    const speakerNames = formData.getAll("speakerName") as string[];
    const speakerTopics = formData.getAll("speakerTopic") as string[];
    const speakerTypes = formData.getAll("speakerType") as ("speaker" | "musical-number") [];

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

            await sql`
        INSERT INTO meetings (
            date,
            "meetingType",
            presiding,
            conducting,
            announcements,
            "openingHymn",
            "openingPrayer",
            "wardBusiness",
            "stakeBusiness",
            "sacramentHymn",
            speakers,
            "closingHymn",
            "closingPrayer"
        ) VALUES (
            ${date},
            ${meetingType},
            ${presiding},
            ${conducting},
            ${announcements as unknown as string},
            ${JSON.stringify(openingHymn)},
            ${openingPrayer},
            ${JSON.stringify(wardBusiness)},
            ${stakeBusiness},
            ${JSON.stringify(sacramentHymn)},
            ${JSON.stringify(speakers)},
            ${JSON.stringify(closingHymn)},
            ${closingPrayer}
        )
    `;

    revalidatePath("/meetings"); // update to match your meetings list route
    redirect("/meetings");

    }//end of CreateMeeting

export async function updateMeeting(id: number, formData: FormData){
    const date = formData.get("date") as string;
    const meetingType = formData.get("meetingType") as MeetingType;
    const presiding = formData.get("presiding") as string;
    const conducting = formData.get("conducting") as string;
    const openingPrayer = formData.get("openingPrayer") as string;
    const closingPrayer = formData.get("closingPrayer") as string;

    //Checkboxes in FormData return 'on' if checked, or null if unchecked
    const stakeBusiness = formData.get("stakeBusiness") === 'on';

    //Pack a single nested object (Hymn)
    const openingHymn: Hymn = {
        number: Number(formData.get("openingHymnNumber")),
        title: formData.get("openingHymnTitle") as string,
    };

    const sacramentHymn = {
        number: Number(formData.get("sacramentHymnNumber")),
        title: formData.get("sacramentHymnTitle") as string,
    };

    const closingHymn = {
        number: Number(formData.get("closingHymnNumber")),
        title: formData.get("closingHymnTitle") as string,
    };

    //Grabs all inputs with name="announcements" as a string array
    const announcements = (formData.getAll("announcements") as string[])
    .map((item) => item.trim())
    .filter((item) => item !== "");

    //Grabs Speakers information
    const speakerNames = formData.getAll("speakerName") as string[];
    const speakerTopics = formData.getAll("speakerTopic") as string[];
    const speakerTypes = formData.getAll("speakerType") as ("speaker" | "musical-number") [];

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

     await sql`
        UPDATE meetings
        SET
            date = ${date},
            "meetingType" = ${meetingType},
            presiding = ${presiding},
            conducting = ${conducting},
            announcements = ${announcements as unknown as string},
            "openingHymn" = ${JSON.stringify(openingHymn)},
            "openingPrayer" = ${openingPrayer},
            "wardBusiness" = ${JSON.stringify(wardBusiness)},
            "stakeBusiness" = ${stakeBusiness},
            "sacramentHymn" = ${JSON.stringify(sacramentHymn)},
            speakers = ${JSON.stringify(speakers)},
            "closingHymn" = ${JSON.stringify(closingHymn)},
            "closingPrayer" = ${closingPrayer}
        WHERE id = ${id}
    `;    
    
    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
    redirect("/meetings");
}//end of updateMeeting