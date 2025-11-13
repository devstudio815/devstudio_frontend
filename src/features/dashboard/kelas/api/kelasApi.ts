import { api } from "@/lib/api";
import { KelasDto, FilterkelasDto, UpsertKelasDto } from "../types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { API_RESPONSE } from "@/types/api";

// ==================== QUERY KEYS ====================
export const KelasKeys = {
  all: ["kelas"] as const,
  lists: () => [...KelasKeys.all, "list"] as const,
  list: (filters: FilterkelasDto) => [...KelasKeys.lists(), filters] as const,
  details: () => [...KelasKeys.all, "detail"] as const,
  detail: (id: string) => [...KelasKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

// GET ALL (with filters)
export async function fetchAllKelas({
  params,
}: {
  params: FilterkelasDto;
}): Promise<API_RESPONSE<KelasDto[]>> {
  const url = new URLSearchParams();
  if (params.limit) {
    url.append("limit", params.limit.toString());
  }
  if (params.page) {
    url.append("page", params.page.toString());
  }
  if (params.search) {
    url.append("search", params.search.toString());
  }
  const req = await api.get<API_RESPONSE<KelasDto[]>>(
    `/kelas?${url.toString()}`
  );
  return req.data;
}

// GET BY ID
export async function fetchKelasById(id: string) {
  const req = await api.get(`/kelas/${id}`);
  return req.data;
}

// CREATE
export async function createKelas(data: UpsertKelasDto) {
  const req = await api.post("/kelas", data);
  return req.data;
}

// UPDATE
export async function updateKelas({
  id,
  data,
}: {
  id: string;
  data: UpsertKelasDto;
}) {
  const req = await api.put(`/kelas/${id}`, data);
  return req.data;
}

// DELETE
export async function deleteKelas(id: string) {
  const req = await api.delete(`/kelas/${id}`);
  return req.data;
}

// ==================== QUERY HOOKS ====================

// GET ALL
export function useFindAllKelas({ params }: { params: FilterkelasDto }) {
  return useQuery({
    queryKey: KelasKeys.list(params),
    queryFn: () => fetchAllKelas({ params }),
    staleTime: 10 * 60 * 1000,
    gcTime: 11 * 60 * 1000,
  });
}

// GET BY ID
export function useFindKelasById(id: string) {
  return useQuery({
    queryKey: KelasKeys.detail(id),
    queryFn: () => fetchKelasById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== MUTATION HOOKS ====================

// CREATE
export function useCreateKelas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createKelas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KelasKeys.lists() });
      toast.success("Mata pelajaran berhasil ditambahkan");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menambahkan mata pelajaran"
      );
    },
  });
}

// UPDATE
export function useUpdateKelas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateKelas,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: KelasKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: KelasKeys.lists() });
      toast("Mata pelajaran berhasil diupdate");
    },
    onError: (error: any) => {
      toast(
        error?.response?.data?.message || "Gagal mengupdate mata pelajaran"
      );
    },
  });
}

// DELETE
export function useDeleteKelas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteKelas,
    onSuccess: (data, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: KelasKeys.detail(id) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: KelasKeys.lists() });
      toast("Mata pelajaran berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Gagal menghapus mata pelajaran"
      );
    },
  });
}

// ==================== OPTIMISTIC UPDATE (Advanced) ====================

export function useUpdateKelasOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateKelas,
    // Optimistic update - UI update sebelum API response
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: KelasKeys.detail(id) });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(KelasKeys.detail(id));

      // Optimistically update cache
      queryClient.setQueryData(KelasKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousData, id };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          KelasKeys.detail(context.id),
          context.previousData
        );
      }
      toast("Gagal mengupdate mata pelajaran");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: KelasKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: KelasKeys.lists() });
    },
  });
}
