import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarDataSiswa } from "@/data/SidebarDataSiswa"
import Link from "next/link"
export function SidebarSiswa(){
    return (

        <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hello </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {SidebarDataSiswa.map((item) => (
                <SidebarMenuItem key={item.name} className="border-2 rounded-xl border-accent">
                  <SidebarMenuButton asChild>
                    <Link href={item.link}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
)
}