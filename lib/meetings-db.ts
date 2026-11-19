import { sql } from "@vercel/postgres";
import { connection } from "next/server";
import { MeetingType, SacramentMeeting } from "./types";

// Type for incoming validated meeting data (everything except id)
export type MeetingInput = Omit<SacramentMeeting, "id">;

/**** Getting all meetings ****/
export async function getAllMeetings(type?: MeetingType | null): Promise<SacramentMeeting[]> {
  await connection();
  if (type) {
    const { rows } = await sql<SacramentMeeting>`
      SELECT * FROM meetings WHERE meeting_type = ${type}
      ORDER BY date ASC
    `;
    return rows;
  }
  const { rows } = await sql<SacramentMeeting>`
    SELECT * FROM meetings
    ORDER BY date ASC
  `;
  return rows;
}

/**** Getting meeting by id ****/
export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  await connection();
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  try {
    const { rows } = await sql<SacramentMeeting>`
      SELECT * FROM meetings WHERE id = ${id}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch meeting with ID ${id}`);
  }
}

/**** Create a new meeting ****/
export async function createMeetingInDb(data: MeetingInput): Promise<void> {
  await connection();
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
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements as unknown as string},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
  `;
}

/**** Update an existing meeting ****/
export async function updateMeetingInDb(id: number, data: MeetingInput): Promise<void> {
  await connection();
  await sql`
    UPDATE meetings
    SET
      date = ${data.date},
      "meetingType" = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements as unknown as string},
      "openingHymn" = ${JSON.stringify(data.openingHymn)},
      "openingPrayer" = ${data.openingPrayer},
      "wardBusiness" = ${JSON.stringify(data.wardBusiness)},
      "stakeBusiness" = ${data.stakeBusiness},
      "sacramentHymn" = ${JSON.stringify(data.sacramentHymn)},
      speakers = ${JSON.stringify(data.speakers)},
      "closingHymn" = ${JSON.stringify(data.closingHymn)},
      "closingPrayer" = ${data.closingPrayer}
    WHERE id = ${id}
  `;
}

/**** Delete a meeting by id ****/
export async function deleteMeetingFromDb(id: number): Promise<void> {
  await connection();
  await sql`
    DELETE FROM meetings WHERE id = ${id}
  `;
}
