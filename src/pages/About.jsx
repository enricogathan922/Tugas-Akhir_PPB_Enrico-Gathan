import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, Zap, Code, Sparkles } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Cepat & Ringan",
      description: "PWA yang dapat diinstall dan bekerja offline",
    },
    {
      icon: Target,
      title: "Mudah Digunakan",
      description: "Interface intuitif untuk tracking keuangan harian",
    },
    {
      icon: Award,
      title: "Gratis Selamanya",
      description: "Tidak ada biaya tersembunyi atau iklan",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="mb-2 px-2 py-1">
          Kelompok 16
        </Badge>
        <h1 className="text-4xl font-bold">Tentang Aplikasi</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Aplikasi manajemen keuangan pribadi yang simpel dan powerful untuk
          membantu kamu mengatur pemasukan dan pengeluaran dengan lebih baik.
        </p>
      </div>

      {/* Creator Card */}
      <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">ENRICO GATHAN AGUNG</h3>
              <p className="text-muted-foreground font-mono text-sm mb-3">
                21120123140127
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full Stack Developer</Badge>
                <Badge variant="secondary">React Developer</Badge>
                <Badge variant="secondary">PWA Expert</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Fitur Unggulan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Teknologi yang Digunakan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="px-4 py-2">
              React
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              React Router
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Tailwind CSS
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              shadcn/ui
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Lucide Icons
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              LocalStorage API
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              PWA
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Express
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Prisma
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Supabase
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Project Info */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Dibuat sebagai Tugas_Modul 4_PPB
            </p>
            <p className="text-sm font-medium">
              © 2024 Money Management App - Kelompok 16
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
