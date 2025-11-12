"use client"
import { HeaderLayoutDashboard } from "@/components/layouts/HeaderLayout";
import { TableMataPelajaran } from "./TableMataPelajaran";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DialogCRUD } from "@/components/ui/DialogCRUD";
import { FormMataPelajaran } from "./FormMataPelajaran";

export default function DashboardMataPelajaran() {
    const [isOpen,setIsOpen]  = useState<boolean>(false)
    return (
        <>
            <HeaderLayoutDashboard name="Dashboard Mata Pelajaran">
                <Button onClick={() => setIsOpen(!isOpen)}>
                    Create
                </Button>
            </HeaderLayoutDashboard>
            <section>

                <TableMataPelajaran />
            </section>
            {
                isOpen &&  (
                    <DialogCRUD isOpen={isOpen} onOpenChange={setIsOpen} title="Create Mata Pelajaran" description="Create Form Mata Pelajaran">
                        <FormMataPelajaran />
                    </DialogCRUD>
                )
            }
        </>
    )
}