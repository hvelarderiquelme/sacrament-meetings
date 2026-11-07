import Link from 'next/link';
import { getDisplayDate } from '@/lib/dates';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
            meeting.meetingType === 'testimony' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
            meeting.meetingType === 'stake' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
            meeting.meetingType === 'general' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
            'bg-emerald-50 text-emerald-700 border border-emerald-100'
          }`}>
            {meeting.meetingType}
          </span>
          {meeting.stakeBusiness && (
            <span className="text-[10px] font-medium text-purple-400">💼 Stake Business</span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-serif font-bold text-lg text-slate-900">
            {getDisplayDate(meeting.date)}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1">Conducting: {meeting.conducting}</p>
          <p className="text-xs text-slate-400 line-clamp-1">
            Hymn #{meeting.openingHymn?.number} • {meeting.openingHymn?.title}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
        <Link 
          href={`/meetings/${meeting.id}`}
          className="text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors flex-1 text-center"
        >
          👁️ View Details
        </Link>
        <Link 
          href={`/meetings/${meeting.id}/print`}
          target="_blank"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200 px-2.5 py-2 rounded-lg transition-all"
        >
          🖨️
        </Link>
      </div>
    </div>
  );
}
