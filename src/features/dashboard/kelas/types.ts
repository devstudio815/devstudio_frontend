export interface KelasDto  {
    kode_kelas  : string
    wali_kelas  : number
    created_at  : string
    updated_at  : string
}

export interface UpsertKelasDto {
    kode_kelas  : string
    wali_kelas  : number
}
export type FilterkelasDto = {
    limit : number
    page  : number
    search : string
}