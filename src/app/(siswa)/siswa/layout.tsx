import { SidebarSiswa } from "@/components/layouts/SidebarSiswa";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarSiswa />
            <main className="p-6">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}