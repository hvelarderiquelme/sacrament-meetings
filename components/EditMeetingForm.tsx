"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";
import { updateMeeting, State } from "@/lib/actions";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors &&
        errors.map((error) => (
          <p key={error} className="mt-1.5 text-xs font-medium text-red-600">
            {error}
          </p>
        ))}
    </div>
  );
}

export default function EditMeetingForm({ meeting }: { meeting: SacramentMeeting }) {
  // Bind meeting.id so updateMeeting receives (id, prevState, formData)
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState
  );

  // Format "2026-11-01T07:00:00.000Z" -> "2026-11-01"
  const formattedDate = new Date(meeting.date).toISOString().split("T")[0];

  // Seed dynamic lists with existing items + unique row Ids
  const [announcements, setAnnouncements] = useState(
    (meeting.announcements || []).map((text, index) => ({
      id: index + 1,
      text,
    }))
  );

  const [speakers, setSpeakers] = useState(
    (meeting.speakers || []).map((speaker, index) => ({
      id: index + 1,
      ...speaker,
    }))
  );

  const [businessItems, setBusinessItems] = useState(
    (meeting.wardBusiness || []).map((item, index) => ({
      id: index + 1,
      ...item,
    }))
  );

  // Add & Remove helpers (using Date.now() for new rows)
  const addAnnouncement = () =>
    setAnnouncements((prev) => [...prev, { id: Date.now(), text: "" }]);
  const removeAnnouncement = (id: number) =>
    setAnnouncements((prev) => prev.filter((item) => item.id !== id));

  const addSpeaker = () =>
    setSpeakers((prev) => [
      ...prev,
      { id: Date.now(), name: "", topic: "", type: "speaker" as const },
    ]);
  const removeSpeaker = (id: number) =>
    setSpeakers((prev) => prev.filter((item) => item.id !== id));

  const addBusiness = () =>
    setBusinessItems((prev) => [
      ...prev,
      { id: Date.now(), description: "", name: "", calling: "", officiator: "" },
    ]);
  const removeBusiness = (id: number) =>
    setBusinessItems((prev) => prev.filter((item) => item.id !== id));

  const labelClass =
    "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5";
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900";

  return (
    <form action={formAction} noValidate className="space-y-8">
      {/* Form-level status banner */}
      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
            {state.message}
          </div>
        )}
      </div>

      {/* Static fields with defaultValue / defaultChecked */}
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
              defaultValue={formattedDate}
              required
              aria-describedby="date-error"
              className={inputClass}
            />
            <FieldError id="date-error" errors={state.errors?.date} />
          </div>

          <div>
            <label htmlFor="meetingType" className={labelClass}>
              Meeting Type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              defaultValue={meeting.meetingType}
              aria-describedby="meetingType-error"
              className={inputClass}
            >
              <option value="regular">Regular</option>
              <option value="testimony">Fast & Testimony</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
              <option value="special">Special</option>
            </select>
            <FieldError
              id="meetingType-error"
              errors={state.errors?.meetingType}
            />
          </div>

          <div>
            <label htmlFor="presiding" className={labelClass}>
              Presiding
            </label>
            <input
              type="text"
              id="presiding"
              name="presiding"
              defaultValue={meeting.presiding}
              required
              aria-describedby="presiding-error"
              className={inputClass}
            />
            <FieldError id="presiding-error" errors={state.errors?.presiding} />
          </div>

          <div>
            <label htmlFor="conducting" className={labelClass}>
              Conducting
            </label>
            <input
              type="text"
              id="conducting"
              name="conducting"
              defaultValue={meeting.conducting}
              required
              aria-describedby="conducting-error"
              className={inputClass}
            />
            <FieldError
              id="conducting-error"
              errors={state.errors?.conducting}
            />
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2.5">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            defaultChecked={meeting.stakeBusiness}
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
              defaultValue={meeting.openingHymn?.number}
              required
              aria-describedby="openingHymnNumber-error"
              className={inputClass}
            />
            <FieldError
              id="openingHymnNumber-error"
              errors={state.errors?.openingHymnNumber}
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
              defaultValue={meeting.openingHymn?.title}
              required
              aria-describedby="openingHymnTitle-error"
              className={inputClass}
            />
            <FieldError
              id="openingHymnTitle-error"
              errors={state.errors?.openingHymnTitle}
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
            defaultValue={meeting.openingPrayer}
            required
            aria-describedby="openingPrayer-error"
            className={inputClass}
          />
          <FieldError
            id="openingPrayer-error"
            errors={state.errors?.openingPrayer}
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
            {announcements.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-2.5"
              >
                <label
                  htmlFor={`announcement-${item.id}`}
                  className={labelClass}
                >
                  Announcement #{index + 1}
                </label>
                <textarea
                  id={`announcement-${item.id}`}
                  maxLength={500}
                  name="announcements"
                  rows={2}
                  defaultValue={item.text}
                  placeholder="Write the announcement here"
                  aria-describedby="announcements-error"
                  className={inputClass}
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeAnnouncement(item.id)}
                    className="bg-red-50 text-red-600 font-medium text-xs rounded-lg px-2.5 py-1 hover:bg-red-100 border border-red-200 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <FieldError
            id="announcements-error"
            errors={state.errors?.announcements}
          />
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
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor={`speakerType-${speaker.id}`}
                      className={labelClass}
                    >
                      Type
                    </label>
                    <select
                      id={`speakerType-${speaker.id}`}
                      name="speakerType"
                      defaultValue={speaker.type}
                      aria-describedby="speakers-error"
                      className={inputClass}
                    >
                      <option value="speaker">Speaker</option>
                      <option value="musical-number">Musical Number</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor={`speakerName-${speaker.id}`}
                      className={labelClass}
                    >
                      Name
                    </label>
                    <input
                      id={`speakerName-${speaker.id}`}
                      type="text"
                      name="speakerName"
                      defaultValue={speaker.name}
                      placeholder="Name"
                      aria-describedby="speakers-error"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`speakerTopic-${speaker.id}`}
                      className={labelClass}
                    >
                      Topic / Song
                    </label>
                    <input
                      id={`speakerTopic-${speaker.id}`}
                      type="text"
                      name="speakerTopic"
                      defaultValue={speaker.topic}
                      placeholder="Topic or Song Title"
                      aria-describedby="speakers-error"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeSpeaker(speaker.id)}
                    className="bg-red-50 text-red-600 font-medium text-xs rounded-lg px-2.5 py-1 hover:bg-red-100 border border-red-200 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <FieldError id="speakers-error" errors={state.errors?.speakers} />
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
            {businessItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor={`businessDescription-${item.id}`}
                      className={labelClass}
                    >
                      Description
                    </label>
                    <input
                      id={`businessDescription-${item.id}`}
                      type="text"
                      name="businessDescription"
                      defaultValue={item.description}
                      placeholder="Description (e.g., Release, Sustaining)"
                      aria-describedby="wardBusiness-error"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`businessName-${item.id}`}
                      className={labelClass}
                    >
                      Member Name
                    </label>
                    <input
                      id={`businessName-${item.id}`}
                      type="text"
                      name="businessName"
                      defaultValue={item.name}
                      placeholder="Member Name"
                      aria-describedby="wardBusiness-error"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`businessCalling-${item.id}`}
                      className={labelClass}
                    >
                      Calling (Optional)
                    </label>
                    <input
                      id={`businessCalling-${item.id}`}
                      type="text"
                      name="businessCalling"
                      defaultValue={item.calling}
                      placeholder="Calling (optional)"
                      aria-describedby="wardBusiness-error"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`businessOfficiator-${item.id}`}
                      className={labelClass}
                    >
                      Officiator (Optional)
                    </label>
                    <input
                      id={`businessOfficiator-${item.id}`}
                      type="text"
                      name="businessOfficiator"
                      defaultValue={item.officiator}
                      placeholder="Officiator (optional)"
                      aria-describedby="wardBusiness-error"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeBusiness(item.id)}
                    className="bg-red-50 text-red-600 font-medium text-xs rounded-lg px-2.5 py-1 hover:bg-red-100 border border-red-200 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <FieldError
            id="wardBusiness-error"
            errors={state.errors?.wardBusiness}
          />
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
                defaultValue={meeting.sacramentHymn?.number}
                required
                aria-describedby="sacramentHymnNumber-error"
                className={inputClass}
              />
              <FieldError
                id="sacramentHymnNumber-error"
                errors={state.errors?.sacramentHymnNumber}
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
                defaultValue={meeting.sacramentHymn?.title}
                required
                aria-describedby="sacramentHymnTitle-error"
                className={inputClass}
              />
              <FieldError
                id="sacramentHymnTitle-error"
                errors={state.errors?.sacramentHymnTitle}
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
              defaultValue={meeting.closingHymn?.number}
              required
              aria-describedby="closingHymnNumber-error"
              className={inputClass}
            />
            <FieldError
              id="closingHymnNumber-error"
              errors={state.errors?.closingHymnNumber}
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
              defaultValue={meeting.closingHymn?.title}
              required
              aria-describedby="closingHymnTitle-error"
              className={inputClass}
            />
            <FieldError
              id="closingHymnTitle-error"
              errors={state.errors?.closingHymnTitle}
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
            defaultValue={meeting.closingPrayer}
            required
            aria-describedby="closingPrayer-error"
            className={inputClass}
          />
          <FieldError
            id="closingPrayer-error"
            errors={state.errors?.closingPrayer}
          />
        </div>
      </section>

      {/* Submit Action Bar */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="bg-slate-100 text-slate-800 font-medium text-xs rounded-xl px-4 py-2.5 hover:bg-slate-200 border border-slate-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="bg-slate-950 text-white font-medium text-xs rounded-xl px-6 py-2.5 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Updating..." : "Update Meeting"}
        </button>
      </div>
    </form>
  );
}
