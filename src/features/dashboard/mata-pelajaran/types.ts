export type FilterMapel = {
    limit : number
    page  : number
    search : string
}
export interface MataPelajaranDto {
  id : number
  nama: string;
  kode: string;
  deskripsi?: string;
  kode_kelas : string | null
  created_at: string;
  updated_at: string;
}
export interface CreateMataPelajaranDto {
  nama: string;
  kode: string;
  deskripsi?: string;
  kode_kelas : string 

}
export interface UpdateMataPelajaranDto {
  id : number
  nama?: string;
  kode?: string;
  deskripsi?: string;
    kode_kelas : string | null

}
