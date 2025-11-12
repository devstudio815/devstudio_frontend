import z from "zod";

export const formSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  kode: z.string().min(2, "Kode minimal 2 karakter").max(10, "Kode maksimal 10 karakter").toUpperCase(),
  kode_kelas: z.string().min(2, "Kode minimal 2 karakter").max(10, "Kode maksimal 10 karakter").toUpperCase(),
  deskripsi: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
})