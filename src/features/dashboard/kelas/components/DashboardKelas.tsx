"use client"
import { HeaderLayoutDashboard } from "@/components/layouts/HeaderLayout";
import { TableKelas } from "./TableKelas";

export default function DashboardKelas(){
    return (
        <>
            <HeaderLayoutDashboard name="Mengelola Kelas"/>
            <section>
                <TableKelas />
            </section>
        </>
    )
}