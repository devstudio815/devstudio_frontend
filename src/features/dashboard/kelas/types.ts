export interface KelasDto {
  created_at: string;
  id: number;
  kapasitas: number;
  nama_kelas: string;
  tahun_ajaran: string;
  tingkat: number;
  wali_kelas: string;
}

export interface UpsertKelasDto {
  kode_kelas: string;
  wali_kelas: number;
}
export type FilterkelasDto = {
  limit: number;
  page: number;
  search: string;
  sortBy: string;
  sortType: string;
};
