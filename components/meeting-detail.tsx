import Link from 'next/link';
import { getDisplayDate } from '@/lib/dates';
import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const fullFormattedDate = getDisplayDate(meeting.date, true);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-100 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          {meeting.meetingType} Service
        </span>
        <h1 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">Sacrament Meeting</h1>
        <p className="text-sm font-medium text-slate-500">{fullFormattedDate}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50/50 p-4 rounded-xl border border-slate-100">
        <div>
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Presiding</span>
          <span className="font-semibold text-slate-800">{meeting.presiding}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Conducting</span>
          <span className="font-semibold text-slate-800">{meeting.conducting}</span>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-wide uppercase text-slate-400">Ward Announcements</h3>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
            {meeting.announcements.map((ann, i) => <li key={i} className="leading-relaxed">{ann}</li>)}
          </ul>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold tracking-wide uppercase text-slate-400 text-center mb-6">Order of Service</h3>
        <div className="flex justify-between text-sm gap-4">
          <span className="text-slate-500">Opening Hymn</span>
          <span className="font-medium text-slate-900 text-right">#{meeting.openingHymn?.number} — {meeting.openingHymn?.title}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Invocation</span>
          <span className="font-medium text-slate-900">{meeting.openingPrayer}</span>
        </div>

        {meeting.wardBusiness && meeting.wardBusiness.length > 0 && (
          <div className="bg-slate-50/50 p-4 rounded-xl space-y-1.5 text-sm border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ward Business</span>
            {meeting.wardBusiness.map((biz, i) => <p key={i} className="text-slate-700 font-medium">• {biz.description}</p>)}
          </div>
        )}

        {meeting.sacramentHymn && meeting.sacramentHymn.number > 0 && (
          <div className="flex justify-between text-sm border-y border-slate-100 py-3 bg-emerald-50/10 px-2 rounded-xl">
            <span className="text-emerald-800 font-medium">Sacrament Hymn</span>
            <span className="font-bold text-slate-900 text-right">#{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}</span>
          </div>
        )}

        <div className="py-2 space-y-3">
          <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Program Schedule</span>
          <div className="space-y-2.5">
            {meeting.speakers?.map((speaker, index) => (
              <div key={index} className={`p-4 rounded-xl border flex justify-between items-center text-sm gap-4 ${speaker.type === 'musical-number' ? 'bg-blue-50/40 border-blue-100/70' : 'bg-white border-slate-100'}`}>
                <div>
                  <span className="font-bold text-slate-900 block text-base">{speaker.name}</span>
                  <span className="text-xs text-slate-500 leading-normal block">{speaker.topic}</span>
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${speaker.type === 'musical-number' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                  {speaker.type === 'musical-number' ? '🎵 Music' : '🎤 Speaker'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <span className="text-slate-500">Closing Hymn</span>
          <span className="font-medium text-slate-900 text-right">#{meeting.closingHymn?.number} — {meeting.closingHymn?.title}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Benediction</span>
          <span className="font-medium text-slate-900">{meeting.closingPrayer}</span>
        </div>
      </div>
    </div>
  );
}
