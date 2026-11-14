import { MeetingsGridSkeleton } from '@/components/meetings-grid-skeleton';

export default function MeetingsLoading() {
  return (
    <div className="space-y-8 font-sans w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-2 flex-1">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded-lg w-64 animate-pulse" />
        </div>
        <div className="h-10 bg-slate-200 rounded-xl w-36 animate-pulse hidden sm:block" />
      </div>

      <MeetingsGridSkeleton />
    </div>
  );
}
