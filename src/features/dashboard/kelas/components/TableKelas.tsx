import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useFindAllKelas } from "../api/kelasApi";
import { FormatDate } from "@/utils/FormatDate";
import { Loader2 } from "lucide-react";
import { KelasDto } from "../types";

interface TableKelasProps {
data : KelasDto[]
isLoading : boolean

}

export function TableKelas({ data,isLoading }: TableKelasProps) {



  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <Loader2 className="animate-spin size-4" />
      </div>
    );
  }


  return (
    <div className="overflow-x-auto rounded-lg border ">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100 border-b">
            <TableHead className="px-4 py-3 font-semibold">
              Nama Kelas
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold">
              Wali Kelas
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold">
              Tingkat
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold">
              Tahun Ajaran
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold">
              Kapasitas Siswa
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold">
              Tanggal
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length ? (
            data.map((kelas) => (
              <TableRow key={kelas.id} className="border-b hover:bg-accent">
                <TableCell className="px-4 py-2 ">{kelas.nama_kelas}</TableCell>
                <TableCell className="px-4 py-2 ">
                  {kelas.wali_kelas || "-"}
                </TableCell>
                <TableCell className="px-4 py-2">{kelas.tingkat}</TableCell>
                <TableCell className="px-4 py-2">{kelas.tahun_ajaran}</TableCell>
                <TableCell className="px-4 py-2">{kelas.kapasitas}</TableCell>
                <TableCell className="px-4 py-2">
                  {FormatDate(kelas.created_at)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="px-4 py-4 text-center text-gray-500"
              >
                Tidak ada data kelas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
