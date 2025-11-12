"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteMapel, useFindAllMapel, useUpdateMapel } from "../api/MapelApi";
import { Loader2, MoreVertical } from "lucide-react";
import { FormatDate } from "@/utils/FormatDate";
import { useState } from "react";
import { DialogCRUD } from "@/components/ui/DialogCRUD";
import { FormMataPelajaran } from "./FormMataPelajaran";
import { MataPelajaranDto } from "../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function TableMataPelajaran() {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectMapel, setSelectMapel] = useState<MataPelajaranDto | null>(null)
    const {mutate,isPending}  = useDeleteMapel()

    const { data, isLoading, error } = useFindAllMapel({
        params: {
            limit: 10,
            page: 1,
            search: ""
        }
    })

    const handleEdit = (item: MataPelajaranDto) => {
        setSelectMapel(item)
        setIsEdit(true)
    }

    const handleDelete = (item: MataPelajaranDto) => {
        mutate(item.id)
    }

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b">
                            <TableHead className="border-r">Kode</TableHead>
                            <TableHead className="border-r">Name</TableHead>
                            <TableHead className="border-r">Kelas</TableHead>
                            <TableHead className="border-r">Deskripsi</TableHead>
                            <TableHead className="border-r">Tanggal Pembuatan</TableHead>
                            <TableHead className="border-r">Update Terakhir</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data.map((item) => (
                                <TableRow key={item.kode} className="border-b">
                                    <TableCell className="border-r">
                                        {item.kode}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {item.nama}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {item.kode_kelas}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {item.deskripsi}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {FormatDate(item.created_at, "date-only")}
                                    </TableCell>
                                    <TableCell className="border-r">
                                        {FormatDate(item.updated_at, "date-only")}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(item)}>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(item)}
                                                    disabled={isPending}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

            <DialogCRUD
                isOpen={isEdit}
                onOpenChange={setIsEdit}
                title="Edit Mata Pelajaran"
            >
                {selectMapel && (
                    <FormMataPelajaran
                        id={selectMapel.id}
                        mode="edit"
                        defaultValues={{
                            ...selectMapel,
                            kode_kelas: selectMapel.kode_kelas ?? ""
                        }}
                        onSuccess={() => setIsEdit(false)}
                    />
                )}
            </DialogCRUD>
        </>
    )
}