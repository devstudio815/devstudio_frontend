import z from "zod";

export const formSchemaKelas = z.object({
  kode_kelas: z.string().min(2, "Nama minimal 2 karakter").max(10, "Nama maksimal 100 karakter"),
  wali_kelas: z.number(),
})