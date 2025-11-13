import { gcTimeDefualt, staleTimeDefault } from "@/constants/constants";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { FilterSiswaDto } from "../types";

export function useFindAllSiswa({ filters }: { filters: FilterSiswaDto }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["siswa", filters],
    queryFn: async () => {
      const url = new URLSearchParams();
      if (filters.limit) {
        url.append("limit", filters.limit.toString());
      }
      if (filters.page) {
        url.append("page", filters.page.toString());
      }
      if (filters.search) {
        url.append("search", filters.search.toString());
      }
      if (filters.sortBy) {
        url.append("sort_by", filters.sortBy.toString());
      }
      if (filters.sortType) {
        url.append("sort_type", filters.sortType.toString());
      }
      const req = await api.get(`/siswa?${url.toString()}`);
      return req.data;
    },
    staleTime: staleTimeDefault,
    gcTime: gcTimeDefualt,
  });

  return {
    data,
    isLoading,
    error,
  };
}
