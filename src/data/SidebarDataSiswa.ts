import { HomeIcon, ClipboardListIcon, NotebookIcon, UserIcon } from "lucide-react";

export const SidebarDataSiswa = [
  {
    name: "Dashboard",
    link: "/siswa/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Attendance",
    link: "/siswa/attendance",
    icon: ClipboardListIcon, // atau ikon lain yang cocok
  },
  {
    name: "Home Work",
    link: "/siswa/homework",
    icon: NotebookIcon,
  },
  {
    name: "Profile",
    link: "/siswa/profile",
    icon: UserIcon,
  },
];
