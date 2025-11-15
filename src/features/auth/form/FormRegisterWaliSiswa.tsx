"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RegisterWaliSiswa = {
    email: string
    password: string
    confirmPassword: string
    nama_lengkap: string
    nisn: string
    hubungan: string
    no_telepon: string
}

export function FormRegisterWaliSiswa() {
    const [formData, setFormData] = useState<RegisterWaliSiswa>({
        email: '',
        password: '',
        confirmPassword: '',
        nama_lengkap: '',
        no_telepon: '',
        hubungan: '',
        nisn: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterWaliSiswa, string>>>({});

    const handleChange = (field: keyof RegisterWaliSiswa, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof RegisterWaliSiswa, string>> = {};

        if (!formData.email) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password tidak cocok';
        }

        if (!formData.nisn) {
            newErrors.nisn = 'NISN wajib diisi';
        } else if (!/^\d{10}$/.test(formData.nisn)) {
            newErrors.nisn = 'NISN harus 10 digit angka';
        }

        if (!formData.nama_lengkap) newErrors.nama_lengkap = 'Nama lengkap wajib diisi';
        if (!formData.hubungan) newErrors.hubungan = 'Hubungan dengan siswa wajib dipilih';

        if (!formData.no_telepon) {
            newErrors.no_telepon = 'No telepon wajib diisi';
        } else if (!/^[0-9]{10,13}$/.test(formData.no_telepon)) {
            newErrors.no_telepon = 'No telepon harus 10-13 digit angka';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form valid, submitting:', formData);
            alert('Registrasi berhasil! Data telah dikirim (cek console)');
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Form Registrasi Wali Siswa</CardTitle>
                <CardDescription>
                    Lengkapi data diri Anda untuk mendaftar sebagai wali siswa/orang tua
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Data Akun Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Data Akun</h3>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="contoh@email.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Konfirmasi Password <span className="text-destructive">*</span></Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Ulangi password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            />
                            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    {/* Data Pribadi Section */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-foreground">Data Pribadi</h3>

                        <div className="space-y-2">
                            <Label htmlFor="nama_lengkap">Nama Lengkap <span className="text-destructive">*</span></Label>
                            <Input
                                id="nama_lengkap"
                                type="text"
                                placeholder="Nama lengkap sesuai KTP"
                                value={formData.nama_lengkap}
                                onChange={(e) => handleChange('nama_lengkap', e.target.value)}
                            />
                            {errors.nama_lengkap && <p className="text-sm text-destructive">{errors.nama_lengkap}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="no_telepon">No Telepon <span className="text-destructive">*</span></Label>
                            <Input
                                id="no_telepon"
                                type="tel"
                                placeholder="08xxxxxxxxxx"
                                value={formData.no_telepon}
                                onChange={(e) => handleChange('no_telepon', e.target.value)}
                            />
                            {errors.no_telepon && <p className="text-sm text-destructive">{errors.no_telepon}</p>}
                        </div>
                    </div>

                    {/* Data Siswa Section */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-foreground">Data Siswa</h3>

                        <div className="space-y-2">
                            <Label htmlFor="nisn">NISN Siswa <span className="text-destructive">*</span></Label>
                            <Input
                                id="nisn"
                                type="text"
                                placeholder="10 digit NISN siswa"
                                value={formData.nisn}
                                onChange={(e) => handleChange('nisn', e.target.value)}
                                maxLength={10}
                            />
                            {errors.nisn && <p className="text-sm text-destructive">{errors.nisn}</p>}
                            <p className="text-xs text-muted-foreground">
                                Masukkan NISN siswa yang akan Anda dampingi
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hubungan">Hubungan dengan Siswa <span className="text-destructive">*</span></Label>
                            <Select
                                value={formData.hubungan}
                                onValueChange={(value) => handleChange('hubungan', value)}
                            >
                                <SelectTrigger id="hubungan">
                                    <SelectValue placeholder="Pilih hubungan dengan siswa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ayah Kandung">Ayah Kandung</SelectItem>
                                    <SelectItem value="Ibu Kandung">Ibu Kandung</SelectItem>
                                    <SelectItem value="Wali">Wali</SelectItem>
                                    <SelectItem value="Kakak">Kakak</SelectItem>
                                    <SelectItem value="Paman">Paman</SelectItem>
                                    <SelectItem value="Bibi">Bibi</SelectItem>
                                    <SelectItem value="Kakek">Kakek</SelectItem>
                                    <SelectItem value="Nenek">Nenek</SelectItem>
                                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.hubungan && <p className="text-sm text-destructive">{errors.hubungan}</p>}
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button onClick={handleSubmit} className="flex-1">
                            Daftar Sekarang
                        </Button>
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Kembali
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}