import { NextRequest, NextResponse } from 'next/server';
import { meetingsDb } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  try {
    const dateFilter = request.nextUrl.searchParams.get('date');

    if (dateFilter) {
      const filteredMeeting = meetingsDb.getByDate(dateFilter);
      
      // If a valid meeting is found, put it in an array. If not, return an empty array.
      if (filteredMeeting) {
        return NextResponse.json([filteredMeeting]);
      }
      return NextResponse.json([]);
    }

    const allMeetings = meetingsDb.getAll();
    return NextResponse.json(allMeetings || []);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
