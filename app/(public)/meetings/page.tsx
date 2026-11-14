import { Suspense } from 'react';
import Link from 'next/link';
import MeetingSearch from '@/components/meeting-search';
import { MeetingsList } from '@/components/meetings-list';
import { MeetingsGridSkeleton } from '@/components/meetings-grid-skeleton';

interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsDashboardPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams?.query;
  const query = rawQuery?.toLowerCase().trim() || '';
  const currentPage = Math.max(1, Number(resolvedParams?.page) || 1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Sacrament Agendas
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage, track, and print your ward weekly programs.
          </p>
        </div>
        <Link
          href="/meetings/new"
          className="inline-flex items-center justify-center bg-slate-950 text-white font-medium text-sm rounded-xl px-4 py-2.5 hover:bg-slate-800 transition-all shadow-sm"
        >
          ➕ Schedule Meeting
        </Link>
      </div>

      <div className="max-w-md">
        <Suspense
          fallback={
            <div className="h-10 w-full rounded-xl bg-slate-100 animate-pulse" />
          }
        >
          <MeetingSearch />
        </Suspense>
      </div>

      <Suspense
        key={`${query}-${currentPage}`}
        fallback={<MeetingsGridSkeleton />}
      >
        <MeetingsList
          query={query}
          rawQuery={rawQuery}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}
