"use client";

import { useState } from "react";
import Link from "next/link";
import { CreateMeeting } from "@/lib/actions";

export default function CreateMeetingPage() {
  // Track each dynamic Ward Business row by a unique timestamp ID
  const [businessIds, setBusinessIds] = useState<number[]>([]);
  const [announcementIds, setAnnouncementIds] = useState<number[]>([]);
  const [speakerIds, setSpeakerIds] = useState<number[]>([]);

  const addBusiness = () => {
    setBusinessIds((prev) => [...prev, Date.now()]);
  };

  const removeBusiness = (idToRemove: number) => {
    setBusinessIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  const addAnnouncement = () => {
    setAnnouncementIds((prev) => [...prev, Date.now()]);
  };

  const removeAnnouncement = (idToRemove: number) => {
    setAnnouncementIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  const addSpeaker = () => {
    setSpeakerIds((prev) => [...prev, Date.now()]);
  };

  const removeSpeaker = (idToRemove: number) => {
    setSpeakerIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  const labelClass =
    "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5";
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900";

  return (
    <main className="space-y-6 max-w-2xl mx-auto font-sans pb-12">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/meetings"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          ← Back to Agendas
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          New Agenda
        </span>
      </div>

      {/* Main White Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
        <div className="text-center space-y-2 border-b border-slate-100 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
            Sacrament Service
          </span>
          <h1 className="font-serif font-bold text-3xl text-slate-900 tracking-tight">
            Create Sacrament Meeting
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Enter the order of service and program schedule
          </p>
        </div>

        <form action={CreateMeeting} className="space-y-8">
          {/* Basic meeting info */}
          <section className="space-y-4 bg-slate-50/50 p-5 rounded-xl border border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Meeting Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className={labelClass}>
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="meetingType" className={labelClass}>
                  Meeting Type
                </label>
                <select
                  id="meetingType"
                  name="meetingType"
                  className={inputClass}
                >
                  <option value="regular">Regular</option>
                  <option value="testimony">Fast & Testimony</option>
                  <option value="stake">Stake Conference</option>
                  <option value="general">General Conference</option>
                  <option value="special">Special</option>
                </select>
              </div>

              <div>
                <label htmlFor="presiding" className={labelClass}>
                  Presiding
                </label>
                <input
                  type="text"
                  id="presiding"
                  name="presiding"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="conducting" className={labelClass}>
                  Conducting
                </label>
                <input
                  type="text"
                  id="conducting"
                  name="conducting"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2.5">
              <input
                type="checkbox"
                id="stakeBusiness"
                name="stakeBusiness"
                className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-900"
              />
              <label
                htmlFor="stakeBusiness"
                className="text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Stake Business
              </label>
            </div>
          </section>

          {/* Order of Service */}
          <section className="space-y-6 pt-2 border-t border-slate-100">
            <h2 className="text-xs font-bold tracking-wide uppercase text-slate-400 text-center">
              Order of Service
            </h2>

            {/* Opening Hymn */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="openingHymnNumber" className={labelClass}>
                  Opening Hymn Number
                </label>
                <input
                  type="text"
                  id="openingHymnNumber"
                  name="openingHymnNumber"
                  required
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="openingHymnTitle" className={labelClass}>
                  Opening Hymn Title
                </label>
                <input
                  type="text"
                  id="openingHymnTitle"
                  name="openingHymnTitle"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Opening Prayer */}
            <div>
              <label htmlFor="openingPrayer" className={labelClass}>
                Opening Prayer
              </label>
              <input
                type="text"
                id="openingPrayer"
                name="openingPrayer"
                required
                className={inputClass}
              />
            </div>

            {/* Announcements */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-wide uppercase text-slate-400">
                  Announcements
                </h2>
                <button
                  type="button"
                  onClick={addAnnouncement}
                  className="bg-slate-100 text-slate-800 font-medium text-xs rounded-xl px-3 py-1.5 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                >
                  + Add Announcement
                </button>
              </div>

              <div className="space-y-3">
                {announcementIds.map((id) => (
                  <div
                    key={id}
                    className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-2.5"
                  >
                    <textarea
                      maxLength={500}
                      name="announcements"
                      rows={2}
                      placeholder="Write the announcement here"
                      className={inputClass}
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeAnnouncement(id)}
                        className="bg-red-50 text-red-600 font-medium text-xs rounded-lg px-2.5 py-1 hover:bg-red-100 border border-red-200 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Speakers */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-wide uppercase text-slate-400">
                  Speakers
                </h2>
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="bg-slate-100 text-slate-800 font-medium text-xs rounded-xl px-3 py-1.5 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                >
                  + Add Speaker
                </button>
              </div>

              <div className="space-y-3">
                {speakerIds.map((id) => (
                  <div
                    key={id}
                    className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <select
                        name="speakerType"
                        defaultValue="speaker"
                        className={inputClass}
                      >
                        <option value="speaker">Speaker</option>
                        <option value="musical-number">Musical Number</option>
                      </select>

                      <input
                        type="text"
                        name="speakerName"
                        placeholder="Name"
                        className={inputClass}
                      />

                      <input
                        type="text"
                        name="speakerTopic"
                        placeholder="Topic or Song Title"
                        className={inputClass}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeSpeaker(id)}
                        className="bg-red-50 text-red-600 font-medium text-xs rounded-lg px-2.5 py-1 hover:bg-red-100 border border-red-200 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ward Business */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-wide uppercase text-slate-400">
                  Ward Business
                </h2>
                <button
                  type="button"
                  onClick={addBusiness}
                  className="bg-slate-100 text-slate-800 font-medium text-xs rounded-xl px-3 py-1.5 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                >
                  + Add Ward Business
                </button>
              </div>

              <div className="space-y-3">
                {businessIds.map((id) => (
                  <div
                    key={id}
                    className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="businessDescription"
                        placeholder="Description (e.g., Release, Sustaining)"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Member Name"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name="businessCalling"
                        placeholder="Calling (optional)"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        name="businessOfficiator"
                        placeholder="Officiator (optional)"
                        className={inputClass}
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeBusiness(id)}
                        className="bg-red-50 text-red-600 font-medium text-xs rounded-lg px-2.5 py-1 hover:bg-red-100 border border-red-200 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>


                                {/* Sacrament Hymn */}
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Sacrament Hymn
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="sacramentHymnNumber" className={labelClass}>
                    Sacrament Hymn Number
                  </label>
                  <input
                    type="text"
                    id="sacramentHymnNumber"
                    name="sacramentHymnNumber"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="sacramentHymnTitle" className={labelClass}>
                    Sacrament Hymn Title
                  </label>
                  <input
                    type="text"
                    id="sacramentHymnTitle"
                    name="sacramentHymnTitle"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Closing Hymn */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <label htmlFor="closingHymnNumber" className={labelClass}>
                  Closing Hymn Number
                </label>
                <input
                  type="text"
                  id="closingHymnNumber"
                  name="closingHymnNumber"
                  required
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="closingHymnTitle" className={labelClass}>
                  Closing Hymn Title
                </label>
                <input
                  type="text"
                  id="closingHymnTitle"
                  name="closingHymnTitle"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Closing Prayer */}
            <div>
              <label htmlFor="closingPrayer" className={labelClass}>
                Closing Prayer
              </label>
              <input
                type="text"
                id="closingPrayer"
                name="closingPrayer"
                required
                className={inputClass}
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/meetings"
              className="bg-slate-100 text-slate-800 font-medium text-xs rounded-xl px-4 py-2.5 hover:bg-slate-200 border border-slate-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-slate-950 text-white font-medium text-xs rounded-xl px-6 py-2.5 hover:bg-slate-800 cursor-pointer"
            >
              Save Meeting
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
