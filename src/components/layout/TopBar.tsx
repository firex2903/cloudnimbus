"use client";
import { usePathname } from "next/navigation";
import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Bienvenida, Dra. Ana 👋" },
  "/dashboard/patients": { title: "Pacientes", subtitle: "Gestiona tus pacientes" },
  "/dashboard/agenda": { title: "Agenda", subtitle: "Tu calendario de sesiones" },
  "/dashboard/sessions": { title: "Sesiones", subtitle: "Historial y próximas sesiones" },
  "/dashboard/tasks": { title: "Tareas Terapéuticas", subtitle: "Asigna y monitorea tareas" },
  "/dashboard/materials": { title: "Biblioteca de Materiales", subtitle: "Gestiona y comparte recursos" },
  "/dashboard/clinical": { title: "Fichas Clínicas", subtitle: "Registros clínicos privados" },
  "/dashboard/whatsapp": { title: "WhatsApp", subtitle: "Recordatorios automáticos" },
  "/dashboard/settings": { title: "Configuración", subtitle: "Ajustes de la plataforma" },
};

const actionButtons: Record<string, { label: string; href: string }> = {
  "/dashboard/patients": { label: "Nuevo paciente", href: "/dashboard/patients/new" },
  "/dashboard/tasks": { label: "Nueva tarea", href: "/dashboard/tasks/new" },
  "/dashboard/materials": { label: "Subir material", href: "/dashboard/materials/new" },
  "/dashboard/clinical": { label: "Nueva ficha", href: "/dashboard/clinical/new" },
};

export function TopBar() {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || { title: "CloudNimbus", subtitle: "" };
  const action = actionButtons[pathname];

  return (
    <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-slate-800 leading-none">{pageInfo.title}</h1>
        <p className="text-xs text-slate-500 mt-0.5">{pageInfo.subtitle}</p>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar..."
          className="pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors">
        <Bell size={18} className="text-slate-600" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full" />
      </button>

      {/* Action */}
      {action && (
        <Link href={action.href}>
          <Button size="sm">
            <Plus size={15} />
            {action.label}
          </Button>
        </Link>
      )}
    </header>
  );
}
