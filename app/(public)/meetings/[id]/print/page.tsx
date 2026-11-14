import Link from 'next/link';
import { Suspense } from 'react';

interface PrintPageProps {
  params: Promise<{ id: string }>;
}

// 1. Dynamic leaf components that read `params` inside Suspense
async function MeetingIdLabel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <span className="font-mono font-medium text-slate-800">#{id}</span>;
}

async function ReturnButton({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Link
      href={`/meetings/${id}`}
      className="inline-flex items-center justify-center w-full bg-slate-950 text-white font-medium text-xs rounded-xl px-4 py-2.5 hover:bg-slate-800 transition"
    >
      ← Return to Meeting Details
    </Link>
  );
}

// 2. Main static App Shell (no `await params` at the top level!)
export default function PrintMeetingPage({ params }: PrintPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm space-y-5">
        <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center mx-auto text-xl">
          🖨️
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold tracking-wide uppercase">
            Under Construction
          </span>
          <h1 className="text-xl font-bold text-slate-900">
            Print View Coming Soon
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            We are currently building a clean, printer-friendly agenda layout for meeting{' '}
            <Suspense fallback={<span className="font-mono text-slate-400">#...</span>}>
              <MeetingIdLabel params={params} />
            </Suspense>
            . Check back soon!
          </p>
        </div>

        <div className="pt-2">
          <Suspense
            fallback={
              <Link
                href="/meetings"
                className="inline-flex items-center justify-center w-full bg-slate-950 text-white font-medium text-xs rounded-xl px-4 py-2.5 opacity-80"
              >
                ← Return to Agendas
              </Link>
            }
          >
            <ReturnButton params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
