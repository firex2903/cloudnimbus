import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-sky-500 to-violet-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background decor */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        {/* Floating clouds */}
        <div className="absolute top-20 right-8 opacity-20 animate-float">
          <svg width="200" height="130" viewBox="0 0 180 117" fill="none">
            <path d="M150 90a30 30 0 000-60 3 3 0 01-3-3A46 46 0 0056.2 38A34 34 0 1034 98h116z" fill="white" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-4 opacity-10 animate-float-slow">
          <svg width="140" height="90" viewBox="0 0 180 117" fill="none">
            <path d="M150 90a30 30 0 000-60 3 3 0 01-3-3A46 46 0 0056.2 38A34 34 0 1034 98h116z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-12">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <path d="M38 30a7 7 0 000-14 1 1 0 01-1-1 11 11 0 00-21.8 2.2A8 8 0 1010 34h28z" fill="white" opacity="0.9" />
            </svg>
            <span className="text-2xl font-bold text-white">CloudNimbus</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Tu práctica,<br />organizada y segura
          </h2>
          <p className="text-sky-100 text-lg leading-relaxed">
            Gestiona pacientes, sesiones, tareas y más — todo en una plataforma diseñada para psicólogos.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-4">
          {[
            "✓ Gestión completa de pacientes",
            "✓ Recordatorios automáticos por WhatsApp",
            "✓ Integración con Calendly",
            "✓ Portal privado para cada paciente",
            "✓ Fichas clínicas seguras",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="text-sky-100 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-sky-200 text-sm">
          © 2024 CloudNimbus · Datos protegidos y seguros
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden p-6 border-b border-slate-100 bg-white">
          <Link href="/"><Logo size="sm" /></Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
