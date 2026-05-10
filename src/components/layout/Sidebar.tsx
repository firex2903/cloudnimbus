"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import {
  LayoutDashboard, Users, Calendar, Video, ClipboardList,
  Library, FileText, MessageCircle, Settings, LogOut,
  ChevronRight, Bell
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { href: "/dashboard/patients", icon: Users, label: "Pacientes" },
  { href: "/dashboard/agenda", icon: Calendar, label: "Agenda" },
  { href: "/dashboard/sessions", icon: Video, label: "Sesiones" },
  { href: "/dashboard/tasks", icon: ClipboardList, label: "Tareas" },
  { href: "/dashboard/materials", icon: Library, label: "Materiales" },
  { href: "/dashboard/clinical", icon: FileText, label: "Fichas Clínicas" },
  { href: "/dashboard/whatsapp", icon: MessageCircle, label: "WhatsApp" },
];

const bottomItems = [
  { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-100 flex flex-col z-40 shadow-[1px_0_16px_rgba(0,0,0,0.04)]">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Logo size="sm" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <Icon size={18} className={cn("flex-shrink-0 transition-colors", active ? "text-sky-500" : "text-slate-400 group-hover:text-slate-600")} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} className="text-sky-400 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-slate-100 pt-3">
        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all duration-150 group"
        >
          <Bell size={18} className="flex-shrink-0 text-slate-400 group-hover:text-slate-600" />
          <span className="flex-1">Notificaciones</span>
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-sky-500 text-white rounded-full">3</span>
        </Link>

        {bottomItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
              pathname === href ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            <Icon size={18} className="flex-shrink-0 text-slate-400 group-hover:text-slate-600" />
            {label}
          </Link>
        ))}

        {/* User */}
        <div className="mt-3 px-3 py-3 rounded-xl bg-slate-50 flex items-center gap-3">
          <Avatar name="Dra. Ana López" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Dra. Ana López</p>
            <p className="text-xs text-slate-500 truncate">Psicóloga</p>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Cerrar sesión">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
