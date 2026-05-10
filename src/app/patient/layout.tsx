import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { LayoutDashboard, ClipboardList, Library, Calendar, Bell, LogOut } from "lucide-react";

const navItems = [
  { href: "/patient", icon: LayoutDashboard, label: "Inicio" },
  { href: "/patient/tasks", icon: ClipboardList, label: "Mis tareas" },
  { href: "/patient/materials", icon: Library, label: "Materiales" },
  { href: "/patient/sessions", icon: Calendar, label: "Mis sesiones" },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50/30">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-6">
          <Logo size="sm" />
          <nav className="flex items-center gap-1 flex-1">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors">
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar name="María González" size="sm" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">María González</p>
                <p className="text-xs text-slate-500">Paciente</p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-red-500">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
