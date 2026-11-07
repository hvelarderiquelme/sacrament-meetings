import { redirect, notFound } from 'next/navigation';
import { getUpcomingSundayDateString } from '@/lib/dates';
import { SacramentMeeting } from '@/lib/types';

export const instant = false;

export default async function CurrentMeetingRedirectPage() {
  const targetSundayDate = getUpcomingSundayDateString();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000';
  
  let targetId: number | null = null;
  let fallbackId: number | null = null;

  try {
    // 1. Fetch matching Sunday from endpoint query filter (?date=2026-11-08)
    const response = await fetch(`${baseUrl}/api/meetings?date=${targetSundayDate}`, {
      cache: 'no-store'
    });

    if (response.ok) {
      const matchedMeetings: SacramentMeeting[] = await response.json();
      
      // Ensure the array contains a real meeting object with an ID before redirecting
      if (Array.isArray(matchedMeetings) && matchedMeetings.length > 0 && matchedMeetings[0]?.id) {
        targetId = matchedMeetings[0].id;
      }
    }

    // 2. Fetch fallback database list if that Sunday isn't scheduled yet
    if (!targetId) {
      const allResponse = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
      if (allResponse.ok) {
        const allMeetings: SacramentMeeting[] = await allResponse.json();
        if (allMeetings && allMeetings.length > 0) {
          fallbackId = allMeetings[allMeetings.length - 1].id;
        }
      }
    }
  } catch (error) {
    console.error("Network fetching glitch:", error);
  }

  // 3. Execute redirection handlers completely outside of the try/catch context block
  if (targetId) {
    redirect(`/meetings/${targetId}`);
  }

  if (fallbackId) {
    redirect(`/meetings/${fallbackId}`);
  }

  notFound();
}
