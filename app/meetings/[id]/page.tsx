import { notFound } from 'next/navigation';
import Link from 'next/link';
import MeetingDetail from '@/components/meeting-detail'; 
import { SacramentMeeting } from '@/lib/types';

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function MeetingDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000';
  
  // 1. Declare state tracking variables outside the block scope
  let meeting: SacramentMeeting | null = null;
  let isFetchError = false;
  let isNotFoundError = false;
  
  try {
    const response = await fetch(`${baseUrl}/api/meetings/${rawId}`, { cache: 'no-store' });
    
    // Check standard route response statuses
    if (response.status === 404 || response.status === 400) {
      isNotFoundError = true;
    } else if (!response.ok) {
      throw new Error("API Failure");
    } else {
      meeting = await response.json();
    }
  } catch (error) {
    console.error("Detail page retrieval error:", error);
    isFetchError = true;
  }

  // 2. Render all fallback conditions and native hooks OUTSIDE of the try/catch context block
  if (isNotFoundError || !meeting) {
    notFound();
  }

  if (isFetchError) {
    return <div className="text-center py-6 text-red-500">Error loading meeting details from API.</div>;
  }

  // 3. Render default success layout
  return (
    <div className="space-y-6 max-w-2xl mx-auto font-sans pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link href="/meetings" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
          ← Back to Agendas
        </Link>
        <Link href={`/meetings/${meeting.id}/print`} target="_blank" className="bg-slate-950 text-white font-medium text-xs rounded-xl px-4 py-2 hover:bg-slate-800">
          🖨️ Open Print View
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}
