import { NextRequest, NextResponse } from 'next/server';
import { meetingsDb } from '@/lib/meetings-db';

interface RouteContext {
  params: Promise<{ id: string }> | { id: string };
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    // Safely resolve the dynamic parameter path map
    const resolvedParams = await context.params;
    const rawId = resolvedParams.id;
    const parsedId = parseInt(rawId, 10);

    // Specification: Return 400 when the id parameter is not a valid number
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: 'Bad Request: ID parameter must be a valid number' }, { status: 400 });
    }

    // Scan database utility
    const meeting = meetingsDb.getById(parsedId);

    // Specification: Return 404 when no meeting with the given ID exists
    if (!meeting) {
      return NextResponse.json({ error: `Not Found: No meeting exists with ID ${parsedId}` }, { status: 404 });
    }

    // Specification: Return 200 with the matching meeting when the ID is valid
    return NextResponse.json(meeting);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
