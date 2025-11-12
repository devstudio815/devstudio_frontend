import { SidebarDashboard } from "@/components/layouts/SidebarSiswa";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarDataSiswa } from "@/data/SidebarDataSiswa";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarDashboard data={SidebarDataSiswa} />
            <main className="w-full p-6">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}