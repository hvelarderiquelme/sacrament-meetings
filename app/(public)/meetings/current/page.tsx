import { redirect, notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getUpcomingSundayDateString } from '@/lib/dates';
import { getAllMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingRedirectPage() {
  await connection();
  const targetSundayDate = getUpcomingSundayDateString();

  let targetId: number | null = null;
  let fallbackId: number | null = null;

  try {
    const allMeetings = await getAllMeetings();

    if (allMeetings.length > 0) {
      // Find the meeting whose date matches the upcoming Sunday
      const matched = allMeetings.find((m) => {
        const dbDate = new Date(m.date).toISOString().split('T')[0];
        return dbDate === targetSundayDate;
      });

      if (matched) {
        targetId = matched.id;
      } else {
        // Fallback to the latest scheduled meeting
        fallbackId = allMeetings[allMeetings.length - 1].id;
      }
    }
  } catch (error) {
    console.error("Database fetching glitch:", error);
  }

  if (targetId) {
    redirect(`/meetings/${targetId}`);
  }

  if (fallbackId) {
    redirect(`/meetings/${fallbackId}`);
  }

  notFound();
}
