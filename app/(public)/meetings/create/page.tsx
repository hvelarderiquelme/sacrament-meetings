"use client";

import { useState } from "react";
import CreateMeeting from "@/lib/actions";

export default function CreateMeetingPage(){
    //Track each dynamic Ward Business row by a unique timestamp ID
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

    return (
        <main className="">
            <h1 className="">
                Create Sacrament Meeting
            </h1>
            <form action={CreateMeeting} className="">
                {/*Basic meeting info */}
                <section className="">
                    <h2 className="">
                        Meeting Details
                    </h2>
                    <div>
                        <label htmlFor="date" className="">
                            Date
                        </label>
                        <input type="date" id="date" name="date" required className=""></input>
                    </div>

                    <div>
                        <label htmlFor="meetingType" className="">Meeting Type</label>
                            <select id="meetingType" name="meetingType" className="">
                                <option value="regular">Regular</option>
                                <option value="testimony">Fast & Testimony</option>
                                <option value="stake">Stake Conference</option>
                                <option value="general">General Conference</option>
                                <option value="special">Special</option>
                            </select>    
                    </div>

                    <div>
                        <label htmlFor="presiding" className="">Presiding</label>
                        <input type="text" id="presiding" name="presiding" required className=""/>
                    </div>

                    <div>
                        <label htmlFor="conducting" className="">Conducting</label>
                        <input type="text" id="conducting" name="conducting" required className=""/>
                    </div>

                    <div>
                        <label htmlFor="stakeBusiness" className="">Stake Business</label>
                        <input type="checkbox" id="stakeBusiness" name="stakeBusiness" className="" /> 
                    </div>
                </section>

                <section>
                    <div>
                        <label htmlFor="openingHymnNumber" className="">Opening Hymn Number</label>
                        <input type="text" id="openingHymnNumber" name="openingHymnNumber" required className=""/>

                        <label htmlFor="openingHymnTitle" className="">Opening Hymn Title</label>
                        <input type="text" id="openingHymnTitle" name="openingHymnTitle" required className=""/>
                    </div>

                    <div>
                        <label htmlFor="openingPrayer" className="">Opening Prayer</label>
                        <input type="text" id="openingPrayer" name="openingPrayer" required className=""/>
                    </div>

                    <section>
                        <h2>Announcements</h2>

                        {announcementIds.map((id) => (
                            <div key={id}>
                                <textarea
                                    maxLength={500}
                                    name="announcements"
                                    placeholder="Write the announcement here"
                                />
                                
                                <button type="button" onClick={()  => removeAnnouncement(id)}>
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

                        {speakerIds.map((id) => (
                            <div key={id}>
                                <select name="speakerType" defaultValue="speaker"> 
                                    <option value="speaker">Speaker</option>
                                    <option value="musical-number">Musical Number</option>
                                </select>

                                <input 
                                    type="text"
                                    name="speakerName"
                                    placeholder="Name"
                                />

                                <input 
                                    type="text"
                                    name="speakerTopic"
                                    placeholder="Topic or Song Title"
                                />

                                <button type="button" onClick={()  => removeSpeaker(id)}>
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

                        {businessIds.map((id) => (
                            <div key={id}>
                                <input
                                    type="text"
                                    name="businessDescription"
                                    placeholder="Description (e.g., Release, Sustaining)"
                                />
                                <input
                                    type="text"
                                    name="businessName"
                                    placeholder="Member Name"
                                />
                                <input
                                    type="text"
                                    name="businessCalling"
                                    placeholder="Calling (optional)"
                                />
                                <input
                                    type="text"
                                    name="businessOfficiator"
                                    placeholder="Officiator (optional)"
                                />
                                <button type="button" onClick={()  => removeBusiness(id)}>
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
                        <input type="text" id="sacramentHymnNumber" name="sacramentHymnNumber" required className=""/>

                        <label htmlFor="sacramentHymnTitle" className="">Sacrament Hymn Title</label>
                        <input type="text" id="sacramentHymnTitle" name="sacramentHymnTitle" required className=""/>
                    </div>

                    <div>
                        <label htmlFor="closingHymnNumber" className="">Closing Hymn Number</label>
                        <input type="text" id="closingHymnNumber" name="closingHymnNumber" required className=""/>

                        <label htmlFor="closingHymnTitle" className="">Closing Hymn Title</label>
                        <input type="text" id="closingHymnTitle" name="closingHymnTitle" required className=""/>
                    </div>

                    <div>
                        <label htmlFor="closingPrayer" className="">Closing Prayer</label>
                        <input type="text" id="closingPrayer" name="closingPrayer" required className=""/>
                    </div>
                </section>

                <button type="submit" className="">
                    Save Meeting
                </button>

            </form>
        </main>
    )
}