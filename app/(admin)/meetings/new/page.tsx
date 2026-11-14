// app/(admin)/meetings/new/page.tsx
import Link from "next/link";

export default function CreateMeetingPage() {
  return (
    <div className="space-y-8">
      {/* Page Header matching your MeetingsDashboardPage */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Create Meeting — Coming in Week 04
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Schedule and prepare a new Sunday Sacrament agenda.
          </p>
        </div>
        <Link
          href="/meetings"
          className="inline-flex items-center justify-center border border-slate-300 bg-white text-slate-700 font-medium text-sm rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-all shadow-sm"
        >
          Cancel
        </Link>
      </div>

      {/* Placeholder Card matching your Empty State UI */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white px-6 py-16 text-center max-w-xl mx-auto my-8 shadow-sm">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 mb-3">
          Week 04 Feature
        </span>
        <h2 className="font-serif font-bold text-2xl text-slate-900">
          Agenda Builder Under Construction
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mt-2">
          The form to enter presiding authorities, hymns, speakers, and announcements will be implemented here in Week 04.
        </p>
        <Link
          href="/meetings"
          className="mt-6 inline-flex items-center justify-center bg-slate-950 text-white text-sm font-medium rounded-xl px-5 py-3 hover:bg-slate-800 transition-all shadow-sm"
        >
          ← Back to Sacrament Agendas
        </Link>
      </div>
    </div>
  );
}
