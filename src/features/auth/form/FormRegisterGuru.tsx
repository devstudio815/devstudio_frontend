import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"

type RegisterGuru = {
	email : string
    password : string
	nama_lengkap : string
    confirmPassword : string
	nip : string
	tempat_lahir : string
	tanggal_lahir : string
	alamat : string
	no_telepon : string
}
export function FormRegisterGuru(){
    const [formData, setFormData] = useState<RegisterGuru>({
        email: '',
        password: '',
        confirmPassword: '',
        nip: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        no_telepon: '',
        
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterGuru, string>>>({});

    const handleChange = (field: keyof RegisterGuru, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof RegisterGuru, string>> = {};

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

        if (!formData.nip) {
            newErrors.nip = 'nip wajib diisi';
        } else if (!/^\d{10}$/.test(formData.nip)) {
            newErrors.nip = 'nip harus 10 digit angka';
        }

        if (!formData.nama_lengkap) newErrors.nama_lengkap = 'Nama lengkap wajib diisi';
        if (!formData.tempat_lahir) newErrors.tempat_lahir = 'Tempat lahir wajib diisi';
        if (!formData.tanggal_lahir) newErrors.tanggal_lahir = 'Tanggal lahir wajib diisi';
        if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';

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
            toast.success('Registrasi berhasil! (Data di console)');
        }
    };

    return (
       <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Form Registrasi Guru</CardTitle>
                <CardDescription>
                    Lengkapi data diri Anda untuk mendaftar sebagai Guru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
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

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-foreground">Data Pribadi</h3>

                        <div className="space-y-2">
                            <Label htmlFor="nip">NIP <span className="text-destructive">*</span></Label>
                            <Input
                                id="nisn"
                                type="text"
                                placeholder="10 digit NIP"
                                value={formData.nip}
                                onChange={(e) => handleChange('nip', e.target.value)}
                                maxLength={10}
                            />
                            {errors.nip && <p className="text-sm text-destructive">{errors.nip}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nama_lengkap">Nama Lengkap <span className="text-destructive">*</span></Label>
                            <Input
                                id="nama_lengkap"
                                type="text"
                                placeholder="Nama lengkap sesuai KTP/Akta"
                                value={formData.nama_lengkap}
                                onChange={(e) => handleChange('nama_lengkap', e.target.value)}
                            />
                            {errors.nama_lengkap && <p className="text-sm text-destructive">{errors.nama_lengkap}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tempat_lahir">Tempat Lahir <span className="text-destructive">*</span></Label>
                                <Input
                                    id="tempat_lahir"
                                    type="text"
                                    placeholder="Kota kelahiran"
                                    value={formData.tempat_lahir}
                                    onChange={(e) => handleChange('tempat_lahir', e.target.value)}
                                />
                                {errors.tempat_lahir && <p className="text-sm text-destructive">{errors.tempat_lahir}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tanggal_lahir">Tanggal Lahir <span className="text-destructive">*</span></Label>
                                <Input
                                    id="tanggal_lahir"
                                    type="date"
                                    value={formData.tanggal_lahir}
                                    onChange={(e) => handleChange('tanggal_lahir', e.target.value)}
                                />
                                {errors.tanggal_lahir && <p className="text-sm text-destructive">{errors.tanggal_lahir}</p>}
                            </div>
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

                        <div className="space-y-2">
                            <Label htmlFor="alamat">Alamat <span className="text-destructive">*</span></Label>
                            <Textarea
                                id="alamat"
                                placeholder="Alamat lengkap tempat tinggal"
                                value={formData.alamat}
                                onChange={(e) => handleChange('alamat', e.target.value)}
                                rows={3}
                            />
                            {errors.alamat && <p className="text-sm text-destructive">{errors.alamat}</p>}
                        </div>
                    </div>

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
    )
}