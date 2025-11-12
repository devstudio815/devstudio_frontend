import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFindAllKelas } from "../api/kelasApi";

export function TableKelas(){
    const {data,isLoading,isError}   = useFindAllKelas({
        params : {
            limit : 10,
            page : 1,
            search : ""
        }
    })
    console.log(data)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Kode
                    </TableHead>
                    <TableHead>
                        Wali Kelas
                    </TableHead>
                    <TableHead>
                        Jumlah Siswa
                    </TableHead>    
                    <TableHead>
                        Terakhir Update
                    </TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    )
}