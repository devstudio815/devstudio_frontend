"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, UserCircle, Users } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const roles = [
    {
      id: 'guru',
      title: 'Guru',
      description: 'Daftar sebagai pengajar/tenaga pendidik',
      icon: GraduationCap,
      color: 'bg-green-100 hover:bg-green-300 border-green-400'
    },
    {
      id: 'siswa',
      title: 'Siswa',
      description: 'Daftar sebagai peserta didik',
      icon: BookOpen,
      color: 'bg-secondary/5 hover:bg-secondary/10 border-secondary/20'
    },
    {
      id: 'wali',
      title: 'Wali Siswa',
      description: 'Daftar sebagai orang tua/wali murid',
      icon: Users,
      color: 'bg-accent/5 hover:bg-accent/10 border-accent/20'
    }
  ];

  const handleRoleSelect = (roleId : string) => {
    console.log('Selected role:', roleId);
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Selamat Datang
          </h1>
          <p className="text-lg text-muted-foreground">
            Silakan pilih jenis akun yang ingin Anda daftarkan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${role.color}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-background shadow-sm border">
                      <Icon className="w-12 h-12 text-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base text-muted-foreground">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}