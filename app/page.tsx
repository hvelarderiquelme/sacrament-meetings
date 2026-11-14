import Link from 'next/link';
import Image from 'next/image';
import { getFormattedDate } from '@/lib/dates';

export default async function Home() {
  const today = await getFormattedDate();

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 min-h-[80vh]">
      
      {/* 1. Hero Background Image Container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/hero-church.jpg" // Place your image inside your public/ folder
          alt="Minimalist architectural background"
          fill
          priority // Ensures this image loads instantly as LCP (Largest Contentful Paint)
          sizes="100vw"
          className="object-cover object-center brightness-[0.92] contrast-[0.98]"
        />
        {/* Soft elegant gradient overlay to blend into the main design */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-transparent to-slate-50/30" />
      </div>

      {/* 2. Main Content Card (Brought to front with z-10) */}
      <div className="relative z-10 max-w-xl w-full bg-white/95 backdrop-blur border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/10 p-8 md:p-12 text-center space-y-8">
        
        {/* Decorative Emblem */}
        <div className="mx-auto w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-3xl shadow-inner">
          ⛪
        </div>

        {/* Heading using our elegant Playfair serif font */}
        <div className="space-y-3">
          <h1 className="font-serif font-bold text-4xl md:text-5xl tracking-tight text-slate-900">
            Sacrament Meetings
          </h1>
          <p className="font-sans text-xs font-semibold tracking-widest text-slate-400 uppercase">
            {today}
          </p>
        </div>

        {/* Divider Line */}
        <div className="w-16 h-0.5 bg-slate-300 mx-auto rounded-full" />

        {/* Description using crisp Inter font */}
        <p className="font-sans text-slate-600 leading-relaxed max-w-sm mx-auto text-sm md:text-base">
          Welcome to your ward digital bulletin. View or print current and past weekly program agendas, or sign in as a leader to schedule upcoming meetings.
        </p>

        {/* Clear Call to Action Navigation Buttons */}
        <nav>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link 
              href="/meetings/current/" 
              className="flex-1 inline-flex items-center justify-center bg-slate-950 text-white font-sans font-medium text-sm rounded-xl px-6 py-3.5 hover:bg-slate-800 active:scale-[0.99] transition-all shadow-sm shadow-slate-900/10"
            >
              Enter Application →
            </Link>
          </div>
        </nav>

      </div>
    </div>
  );
}
