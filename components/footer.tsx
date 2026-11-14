import { getCurrentYear } from "@/lib/dates";

export default async function Footer() {

    const year = await getCurrentYear();

    return(
        <footer className="w-full text-center py-6 border-t border-slate-200/80 bg-white font-sans text-sm text-slate-600 tracking-wide font-medium">
            <div>
                © {year} Sacrament Meetings Manager • Horacio Velarde • WDD430
            </div>
        </footer>
    );
}