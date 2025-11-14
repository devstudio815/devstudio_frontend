"use client"
import { HeaderLayoutDashboard } from "@/components/layouts/HeaderLayout";
import { useDebounce } from "@/hooks/use-debounce";
import { TableKelas } from "./TableKelas";
import { FilterDashboard } from "../../components/FilterDashboard";
import { useFilterDashboard } from "../hooks/useFilterDashboard";
import { useFindAllKelas } from "../api/kelasApi";
import { KelasDto } from "../types";
import { PaginationComponents } from "@/components/ui/pagination";
import { PaginationResponse } from "@/types/api";

export default function DashboardKelas() {
    const { limit, onChangeLimit, onChangeSearch, search, page,onChangePage } = useFilterDashboard()
    const debounceLimit = useDebounce(limit, 300)
    const debounceSearch = useDebounce(search, 400)
    const { data, isLoading, isError } = useFindAllKelas({
        params: {
            limit : debounceLimit,
            page,
            search: debounceSearch as string,
            sortBy: "",
            sortType: "",
        },
    });
    return (
        <>
            <HeaderLayoutDashboard name="Pengelolaan Kelas">
                <FilterDashboard limit={limit} setLimit={(e) => onChangeLimit(e)} setSearch={(e) => onChangeSearch(e)} search={search as string} />
            </HeaderLayoutDashboard>

            <section>
                <TableKelas data={data?.data.data as KelasDto[]} isLoading={isLoading} />
            </section>
            {
                data?.data.meta && (
            <section>
              <PaginationComponents onPageChange={() => onChangePage(10)} pagination={data?.data.meta as PaginationResponse}/>
            </section>

                )
            }
        </>
    )
}