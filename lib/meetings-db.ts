import { sql } from "@vercel/postgres";
import { connection } from "next/server"
import { MeetingType, SacramentMeeting } from "./types";


/****Getting all meetings****/
export async function getAllMeetings(type?: MeetingType | null): Promise<SacramentMeeting[]> {
    await connection(); // Ensure the database connection is established
        if (type) {
            const { rows } = await sql<SacramentMeeting>
            `SELECT * FROM meetings WHERE meeting_type = ${type}
             ORDER BY date ASC`;
            return rows;
        }
        const { rows } = await sql<SacramentMeeting>
        `SELECT * FROM meetings
         ORDER BY date ASC`;
        return rows;
};//end of getAllMeetings

/****Getting meeting by id****/
export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
    await connection(); // Ensure the database connection is established
    if (!Number.isInteger(id) || id <= 0) {
        return null; // Invalid ID, return null
    }

    try {
        const { rows } = await sql<SacramentMeeting>
        `SELECT * FROM meetings WHERE id = ${id}`;
        return rows[0] || null;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error(`Failed to fetch meeting with ID ${id}`);
    }
};//end of getMeetingById