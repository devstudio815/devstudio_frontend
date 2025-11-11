import { SidebarSiswa } from "@/components/layouts/SidebarSiswa";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarSiswa />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}