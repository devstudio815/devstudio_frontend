import { SidebarDashboard } from "@/components/layouts/SidebarSiswa";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarDataKepalaSekolah } from "@/data/SidebarDataKepalaSekolah";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarDashboard data={SidebarDataKepalaSekolah}/>
            <main className="w-full p-6 space-y-2">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}