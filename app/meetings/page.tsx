import Link from 'next/link';
import MeetingCard from '@/components/meeting-card'; 
import { SacramentMeeting } from '@/lib/types'; 

//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function MeetingsDashboardPage() {
  //await delay(2000); 

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000';
  
  // 1. Declare the data state variable outside of the blocks
  let meetings: SacramentMeeting[] = [];
  let isFetchError = false;

  // 2. Wrap ONLY the network latency task inside the try/catch context
  try {
    const response = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error("API Fetch Error");
    }
    meetings = await response.json();
  } catch (err) {
    console.error("Dashboard fetching failure:", err);
    isFetchError = true;
  }

  // 3. Render any alternate UI states completely outside the try/catch block
  if (isFetchError) {
    return <div className="text-center py-6 text-red-500">Error loading meetings dashboard list.</div>;
  }

  if (!meetings || meetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white px-6 py-16 text-center max-w-xl mx-auto my-8 shadow-sm">
        <h2 className="font-serif font-bold text-2xl text-slate-900">No Meetings Scheduled Yet</h2>
        <p className="text-sm text-slate-500 max-w-sm mt-2">Get started by scheduling your first Sunday agenda.</p>
        <Link href="/meetings/create" className="mt-6 inline-flex bg-slate-950 text-white text-sm font-medium rounded-xl px-5 py-3">
          ➕ Schedule First Sunday
        </Link>
      </div>
    );
  }

  // 4. Default Success View Grid
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">Sacrament Agendas</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage, track, and print your ward's weekly programs.</p>
        </div>
        <Link href="/meetings/create" className="inline-flex items-center justify-center bg-slate-950 text-white font-medium text-sm rounded-xl px-4 py-2.5 hover:bg-slate-800 transition-all shadow-sm">
          ➕ Schedule Meeting
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
