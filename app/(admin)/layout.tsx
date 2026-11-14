// app/(admin)/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leadership Portal | Sacrament Meetings Manager",
  description: "Create and edit weekly Sacrament meeting agendas.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Subtle Leadership Sub-Bar beneath your main <Header /> */}
      <div className="bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-semibold uppercase tracking-wider text-slate-200">
              Leadership &amp; Admin Workspace
            </span>
          </div>
          <Link
            href="/meetings"
            className="text-slate-300 hover:text-white font-medium transition-colors"
          >
            ← Back to Public Agendas
          </Link>
        </div>
      </div>

      {/* Main Content Container matching your dashboard typography & spacing */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </div>
    </div>
  );
}
