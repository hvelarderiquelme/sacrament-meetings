"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error("Meetings route error:", error);
  }, [error]);

  return (
    <main className="max-w-xl mx-auto my-12 font-sans px-4">
      <div className="bg-white border border-red-200/80 rounded-2xl shadow-sm p-8 md:p-10 text-center space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-red-50 text-red-700 rounded-full border border-red-100">
          Something Went Wrong
        </span>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-2xl text-slate-900 tracking-tight">
            Unable to Complete Request
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {error.message ||
              "An unexpected error occurred while processing your sacrament meeting request."}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto bg-slate-950 text-white font-medium text-xs rounded-xl px-5 py-2.5 hover:bg-slate-800 cursor-pointer"
          >
            Try Again
          </button>

          <Link
            href="/meetings"
            className="w-full sm:w-auto bg-slate-100 text-slate-800 font-medium text-xs rounded-xl px-5 py-2.5 hover:bg-slate-200 border border-slate-200"
          >
            ← Back to Agendas
          </Link>
        </div>
      </div>
    </main>
  );
}
