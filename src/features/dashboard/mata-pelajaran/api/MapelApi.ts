import { api } from "@/lib/api"
import { FilterMapel, CreateMataPelajaranDto, UpdateMataPelajaranDto, MataPelajaranDto } from "../types"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { API_RESPONSE, ApiPagination } from "@/types/api"

// ==================== QUERY KEYS ====================
export const mapelKeys = {
  all: ["mata-pelajaran"] as const,
  lists: () => [...mapelKeys.all, "list"] as const,
  list: (filters: FilterMapel) => [...mapelKeys.lists(), filters] as const,
  details: () => [...mapelKeys.all, "detail"] as const,
  detail: (id: number) => [...mapelKeys.details(), id] as const,
}

// ==================== API FUNCTIONS ====================

// GET ALL (with filters)
export async function fetchAllMapel({ params }: { params: FilterMapel }): Promise<ApiPagination<MataPelajaranDto[]>> {
  const url = new URLSearchParams()
  if (params.limit) {
    url.append("limit", params.limit.toString())
  }
  if (params.page) {
    url.append("page", params.page.toString())
  }
  if (params.search) {
    url.append("search", params.search.toString())
  }
  const req = await api.get<ApiPagination<MataPelajaranDto[]>>(`/mata-pelajaran?${url.toString()}`)
  return req.data
}

// GET BY KODE
export async function fetchMapelByKode(kode: string) {
  const req = await api.get(`/mata-pelajaran/${kode}`)
  return req.data
}

// CREATE
export async function createMapel(data: CreateMataPelajaranDto) {
  const req = await api.post("/mata-pelajaran", data)
  return req.data
}

// UPDATE - Gunakan kode sebagai identifier
export async function updateMapel({ id, data }: { id: number; data: UpdateMataPelajaranDto }) {
  const req = await api.put(`/mata-pelajaran/${id}`, data)
  return req.data
}

// DELETE
export async function deleteMapel(id : number) {
  const req = await api.delete(`/mata-pelajaran/${id}`)
  return req.data
}

// ==================== QUERY HOOKS ====================

// GET ALL
export function useFindAllMapel({ params }: { params: FilterMapel }) {
  return useQuery({
    queryKey: mapelKeys.list(params),
    queryFn: () => fetchAllMapel({ params }),
    staleTime: 10 * 60 * 1000,
    gcTime: 11 * 60 * 1000,
  })
}

// // GET BY KODE
// export function useFindMapelByKode(id: number) {
//   return useQuery({
//     queryKey: mapelKeys.detail(id),
//     queryFn: () => fetchMapelByi(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000,
//   })
// }

// ==================== MUTATION HOOKS ====================

// CREATE
export function useCreateMapel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMapel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mapelKeys.lists() })
      toast.success("Mata pelajaran berhasil ditambahkan")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal menambahkan mata pelajaran")
    },
  })
}

// UPDATE WITH OPTIMISTIC UPDATE
export function useUpdateMapel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMapel,
    
    // 🚀 OPTIMISTIC UPDATE
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: mapelKeys.lists() })
      await queryClient.cancelQueries({ queryKey: mapelKeys.detail(id) })

      // Snapshot previous values
      const previousLists = queryClient.getQueriesData({ queryKey: mapelKeys.lists() })
      const previousDetail = queryClient.getQueryData(mapelKeys.detail(id))

      // Optimistically update LIST cache
      queryClient.setQueriesData<ApiPagination<MataPelajaranDto[]>>(
        { queryKey: mapelKeys.lists() },
        (old) => {
          if (!old) return old
          
          return {
            ...old,
            data: old.data.map(item => 
              item.id === id 
                ? { ...item, ...data, updated_at: new Date().toISOString() }
                : item
            )
          }
        }
      )

      // Optimistically update DETAIL cache
      queryClient.setQueryData(
        mapelKeys.detail(id),
        (old: any) => old ? { ...old, ...data, updated_at: new Date().toISOString() } : old
      )

      toast.success("Mata pelajaran berhasil diupdate")

      // Return context for rollback
      return { previousLists, previousDetail, id }
    },

    // ❌ ROLLBACK on error
    onError: (error: any, variables, context) => {
      // Restore previous data
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(mapelKeys.detail(context.id), context.previousDetail)
      }
      
      toast.error(error?.response?.data?.message || "Gagal mengupdate mata pelajaran")
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: mapelKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: mapelKeys.lists() })
    },
  })
}

// DELETE WITH OPTIMISTIC UPDATE
export function useDeleteMapel() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMapel,
    
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: mapelKeys.lists() })
      
      const previousLists = queryClient.getQueriesData({ queryKey: mapelKeys.lists() })

      // Optimistically remove from list
      queryClient.setQueriesData<ApiPagination<MataPelajaranDto[]>>(
        { queryKey: mapelKeys.lists() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter(item => item.id !== id)
          }
        }
      )

      toast.success("Mata pelajaran berhasil dihapus")

      return { previousLists, id }
    },

    onError: (error: any, kode, context) => {
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      toast.error(error?.response?.data?.message || "Gagal menghapus mata pelajaran")
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: mapelKeys.lists() })
    },
  })
}