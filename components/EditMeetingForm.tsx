"use client";

import { useState } from "react";
import { SacramentMeeting } from "@/lib/types";
import { updateMeeting } from "@/lib/actions";

export default function EditMeetingForm ({ meeting }: { meeting: SacramentMeeting }) {
    //Bind meeting.id so updateMeeting receives (id, formData)
    const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

    //Format "2026-11-01T07:00:00.000Z" -> "2026-11-01"
    const formattedDate = new Date(meeting.date).toISOString().split("T")[0];

    //Seed dynamic lists with existing items + unique row Ids
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

        return (
        <form action={updateMeetingWithId}>
            {/* Static fields with defaultValue / defaultChecked */}
            <section>
                <h2>Meeting Details</h2>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" defaultValue={formattedDate} required />
                </div>

                <div>
                    <label htmlFor="meetingType">Meeting Type</label>
                    <select id="meetingType" name="meetingType" defaultValue={meeting.meetingType}>
                        <option value="regular">Regular</option>
                        <option value="testimony">Fast & Testimony</option>
                        <option value="stake">Stake Conference</option>
                        <option value="general">General Conference</option>
                        <option value="special">Special</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="presiding">Presiding</label>
                    <input type="text" id="presiding" name="presiding" defaultValue={meeting.presiding} required />
                </div>

                <div>
                    <label htmlFor="conducting">Conducting</label>
                    <input type="text" id="conducting" name="conducting" defaultValue={meeting.conducting} required />
                </div>

                <div>
                    <label htmlFor="stakeBusiness">Stake Business</label>
                    <input type="checkbox" id="stakeBusiness" name="stakeBusiness" defaultChecked={meeting.stakeBusiness} />
                </div>
            </section>

            <section>
                    <div>
                        <label htmlFor="openingHymnNumber" className="">Opening Hymn Number</label>
                        <input type="text" id="openingHymnNumber" name="openingHymnNumber" defaultValue={meeting.openingHymn.number} required className=""/>

                        <label htmlFor="openingHymnTitle" className="">Opening Hymn Title</label>
                        <input type="text" id="openingHymnTitle" name="openingHymnTitle" defaultValue={meeting.openingHymn.title} required className=""/>
                    </div>

                    <div>
                        <label htmlFor="openingPrayer" className="">Opening Prayer</label>
                        <input type="text" id="openingPrayer" name="openingPrayer" defaultValue={meeting.openingPrayer} required className=""/>
                    </div>

                    <section>
                        <h2>Announcements</h2>

                        {announcements.map((item) => (
                            <div key={item.id}>
                                <textarea
                                    maxLength={500}
                                    name="announcements"
                                    defaultValue={item.text}
                                />
                                
                                <button type="button" onClick={()  => removeAnnouncement(item.id)}>
                                    Remove
                                </button>
                            </div>                                
                        ))}

                        <button type="button" onClick={addAnnouncement}>
                            + Add Announcement
                        </button>
                    </section>

                    <section>
                        <h2>Speakers</h2>

                        {speakers.map((speaker) => (
                            <div key={speaker.id}>
                                <select name="speakerType" defaultValue={speaker.type}> 
                                    <option value="speaker">Speaker</option>
                                    <option value="musical-number">Musical Number</option>
                                </select>

                                <input 
                                    type="text"
                                    name="speakerName"
                                    defaultValue={speaker.name}
                                />

                                <input 
                                    type="text"
                                    name="speakerTopic"
                                    defaultValue={speaker.topic}
                                />

                                <button type="button" onClick={()  => removeSpeaker(speaker.id)}>
                                    Remove
                                </button>
                            </div>                                
                        ))}

                        <button type="button" onClick={addSpeaker}>
                            + Add Speaker
                        </button>
                    </section>

                    <section>
                        <h2>Ward Business</h2>

                        {businessItems.map((item) => (
                            <div key={item.id}>
                                <input
                                    type="text"
                                    name="businessDescription"
                                    defaultValue={item.description}
                                />
                                <input
                                    type="text"
                                    name="businessName"
                                    defaultValue={item.name}
                                />
                                <input
                                    type="text"
                                    name="businessCalling"
                                    defaultValue={item.calling}
                                />
                                <input
                                    type="text"
                                    name="businessOfficiator"
                                    defaultValue={item.officiator}
                                />
                                <button type="button" onClick={()  => removeBusiness(item.id)}>
                                    Remove
                                </button>
                            </div>                                
                        ))}

                        <button type="button" onClick={addBusiness}>
                            + Add Ward Business
                        </button>
                    </section>

                    <div>
                        <label htmlFor="sacramentHymnNumber" className="">Sacrament Hymn Number</label>
                        <input type="text" id="sacramentHymnNumber" name="sacramentHymnNumber" defaultValue={meeting.sacramentHymn.number} required className=""/>

                        <label htmlFor="sacramentHymnTitle" className="">Sacrament Hymn Title</label>
                        <input type="text" id="sacramentHymnTitle" name="sacramentHymnTitle" defaultValue={meeting.sacramentHymn.title} required className=""/>
                    </div>

                    <div>
                        <label htmlFor="closingHymnNumber" className="">Closing Hymn Number</label>
                        <input type="text" id="closingHymnNumber" name="closingHymnNumber" defaultValue={meeting.closingHymn.number} required className=""/>

                        <label htmlFor="closingHymnTitle" className="">Closing Hymn Title</label>
                        <input type="text" id="closingHymnTitle" name="closingHymnTitle" defaultValue={meeting.closingHymn.title} required className=""/>
                    </div>

                    <div>
                        <label htmlFor="closingPrayer" className="">Closing Prayer</label>
                        <input type="text" id="closingPrayer" name="closingPrayer" defaultValue={meeting.closingPrayer} required className=""/>
                    </div>
                </section>

            <button type="submit">Update Meeting</button>
        </form>
    );

}//end od EditMeetingForm