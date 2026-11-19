import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <main className="max-w-xl mx-auto my-12 font-sans px-4">
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 md:p-10 text-center space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
          404 • Not Found
        </span>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-2xl text-slate-900 tracking-tight">
            Meeting Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            We couldn&apos;t find the sacrament meeting agenda you&apos;re trying to edit. It may have been deleted or the link may be incorrect.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/meetings"
            className="inline-flex items-center justify-center bg-slate-950 text-white font-medium text-xs rounded-xl px-5 py-2.5 hover:bg-slate-800 transition-colors"
          >
            ← Back to Agendas
          </Link>
        </div>
      </div>
    </main>
  );
}
