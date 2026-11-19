import { notFound } from "next/navigation";
import Link from "next/link";
import { getMeetingById } from "@/lib/meetings-db";
import EditMeetingForm from "@/components/EditMeetingForm";

export default async function EditMeetingPage({
    params,
}:{
    params: Promise<{id: string}>;
}) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));
    
    if(!meeting) {
        notFound();
    }

    // Inside your EditMeetingPage return statement:
return (
  <main className="space-y-6 max-w-2xl mx-auto font-sans pb-12">
    {/* Top Navigation Bar */}
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <Link
        href={`/meetings/${meeting.id}`}
        className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
      >
        ← Back to Meeting Details
      </Link>
      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
        Edit Mode
      </span>
    </div>

    {/* Main White Document Card */}
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-100 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          Sacrament Service
        </span>
        <h1 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">
          Edit Sacrament Meeting
        </h1>
        <p className="text-sm font-medium text-slate-500">
          Update the order of service and program schedule
        </p>
      </div>

      <EditMeetingForm meeting={meeting} />
    </div>
  </main>
);

    
}