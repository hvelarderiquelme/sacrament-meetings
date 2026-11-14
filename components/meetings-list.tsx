import Link from 'next/link';
import { unstable_rethrow } from 'next/navigation';
import MeetingCard from '@/components/meeting-card';
import { Pagination } from '@/components/pagination';
import { SacramentMeeting } from '@/lib/types';
import { getAllMeetings } from '@/lib/meetings-db';

const ITEMS_PER_PAGE = 6;

interface MeetingsListProps {
  query: string;
  rawQuery?: string;
  currentPage: number;
}

export async function MeetingsList({
  query,
  rawQuery,
  currentPage,
}: MeetingsListProps) {
  let meetings: SacramentMeeting[] = [];
  let isFetchError = false;

  try {
    meetings = await getAllMeetings();
  } catch (err) {
    unstable_rethrow(err);
    console.error('Dashboard fetching failure:', err);
    isFetchError = true;
  }

  if (isFetchError) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading meetings dashboard list.
      </div>
    );
  }

  if ((!meetings || meetings.length === 0) && !query) {
    return (
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white px-6 py-16 text-center max-w-xl mx-auto my-8 shadow-sm">
        <h2 className="font-serif font-bold text-2xl text-slate-900">
          No Meetings Scheduled Yet
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mt-2">
          Get started by scheduling your first Sunday agenda.
        </p>
        <Link
          href="/meetings/new"
          className="mt-6 inline-flex bg-slate-950 text-white text-sm font-medium rounded-xl px-5 py-3"
        >
          ➕ Schedule First Sunday
        </Link>
      </div>
    );
  }

  const filteredMeetings = query
    ? meetings.filter((meeting) => {
        const speakerDetails =
          meeting.speakers
            ?.flatMap((speaker) => [speaker.name, speaker.topic])
            .filter(Boolean) || [];

        const searchableText = [
          meeting.presiding,
          meeting.conducting,
          meeting.meetingType,
          ...speakerDetails,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(query);
      })
    : meetings;

  const totalPages = Math.ceil(filteredMeetings.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedMeetings = filteredMeetings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (paginatedMeetings.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
        <p className="text-slate-600 font-medium">
          No meetings matched &ldquo;{rawQuery}&rdquo;
        </p>
        <p className="text-sm text-slate-400 mt-1">
          Try searching for a different speaker, leader, topic, or meeting type.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedMeetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={safePage}
        ariaLabel="Meetings pagination"
      />
    </>
  );
}
