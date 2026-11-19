import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import EditMeetingForm from "@/components/EditMeetingForm";

export default async function EditMeetingPage({
    params,
}:{
    params: Promise<{id: string}>;
}) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));

    if(!meeting) {
        notFound();
    }

    return(
        <main>
            <h1>Edit Sacrament Meeting</h1>
            <EditMeetingForm meeting={meeting} />
        </main>
    );
    
}