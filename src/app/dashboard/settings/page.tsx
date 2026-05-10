"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Bell, Lock, Palette, Globe, Calendar, MessageCircle, User, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    taskAssigned: true,
    taskCompleted: true,
    email: true,
    whatsapp: true,
  });

  const sections = [
    { id: "profile", icon: User, label: "Perfil" },
    { id: "notifications", icon: Bell, label: "Notificaciones" },
    { id: "security", icon: Lock, label: "Seguridad" },
    { id: "appearance", icon: Palette, label: "Apariencia" },
    { id: "integrations", icon: Globe, label: "Integraciones" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Configuración</h2>
        <p className="text-slate-500 text-sm">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-3 h-fit">
          {sections.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-0.5 ${activeSection === id ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50"}`}>
              <Icon size={16} className={activeSection === id ? "text-sky-500" : "text-slate-400"} />
              {label}
              <ChevronRight size={14} className="ml-auto text-slate-300" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeSection === "profile" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5">Perfil profesional</h3>
              <div className="flex items-center gap-4 mb-6">
                <Avatar name="Dra. Ana López" size="xl" />
                <div>
                  <Button variant="secondary" size="sm">Cambiar foto</Button>
                  <p className="text-xs text-slate-400 mt-1.5">JPG, PNG o GIF. Máx 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Nombre", value: "Ana", placeholder: "Tu nombre" },
                  { label: "Apellido", value: "López", placeholder: "Tu apellido" },
                ].map(({ label, value, placeholder }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                    <input defaultValue={value} placeholder={placeholder}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input defaultValue="ana.lopez@cloudnimbus.com" type="email"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
                  <input defaultValue="+56 9 1234 5678"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Especialidad</label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                    <option>Psicología Clínica</option>
                    <option>Terapia Cognitivo-Conductual</option>
                    <option>Psicoanálisis</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Button variant="secondary">Cancelar</Button>
                <Button>Guardar cambios</Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5">Preferencias de notificaciones</h3>
              <div className="space-y-4">
                {[
                  { key: "sessionReminders", label: "Recordatorios de sesiones", desc: "Recibe alertas antes de cada sesión programada" },
                  { key: "taskAssigned", label: "Tareas asignadas", desc: "Notificación cuando asignas una nueva tarea" },
                  { key: "taskCompleted", label: "Tareas completadas", desc: "Alerta cuando un paciente completa una tarea" },
                  { key: "email", label: "Notificaciones por email", desc: "Recibe resúmenes diarios y alertas importantes" },
                  { key: "whatsapp", label: "Confirmaciones por WhatsApp", desc: "Confirmar acciones importantes por WhatsApp" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <div
                      className={`w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ${notifications[key as keyof typeof notifications] ? "bg-sky-500" : "bg-slate-200"}`}
                      onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key as keyof typeof notifications] }))}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifications[key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "integrations" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5">Integraciones</h3>
              <div className="space-y-4">
                {[
                  { name: "Calendly", desc: "Sincroniza tu calendario y reservas automáticas", icon: <Calendar size={24} className="text-violet-600" />, connected: false },
                  { name: "WhatsApp Business", desc: "Envía recordatorios y mensajes a tus pacientes", icon: <MessageCircle size={24} className="text-emerald-600" />, connected: true },
                  { name: "Google Calendar", desc: "Sincroniza eventos con tu Google Calendar", icon: <Globe size={24} className="text-sky-600" />, connected: false },
                ].map(({ name, desc, icon, connected }) => (
                  <div key={name} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <Button variant={connected ? "secondary" : "primary"} size="sm">
                      {connected ? "Configurar" : "Conectar"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5">Seguridad</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña actual</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nueva contraseña</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirmar nueva contraseña</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent" />
                </div>
                <Button>Actualizar contraseña</Button>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-5">Apariencia</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Tema</label>
                <div className="flex gap-3">
                  {[
                    { value: false, label: "Claro", preview: "bg-white border-slate-200" },
                    { value: true, label: "Oscuro", preview: "bg-slate-800 border-slate-700" },
                  ].map(({ value, label, preview }) => (
                    <button key={label} onClick={() => setDarkMode(value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${darkMode === value ? "border-sky-500" : "border-slate-200"}`}>
                      <div className={`w-16 h-12 rounded-xl border ${preview} overflow-hidden`}>
                        <div className="w-4 h-1.5 bg-slate-300 rounded m-2" />
                        <div className="w-8 h-1 bg-slate-200 rounded mx-2" />
                        <div className="w-6 h-1 bg-slate-200 rounded mx-2 mt-1" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
