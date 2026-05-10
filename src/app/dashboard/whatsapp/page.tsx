"use client";
import { useState } from "react";
import { mockWhatsAppLogs, mockPatients } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";
import { MessageCircle, Send, Settings, CheckCircle, XCircle, Clock, Zap, Phone, ChevronRight } from "lucide-react";

const templates = [
  { id: "session_reminder", name: "Recordatorio de sesión", message: "Hola {nombre}, te recuerdo que mañana tienes sesión a las {hora}. ¡Te espero! 🌤️", type: "auto" },
  { id: "task_reminder", name: "Recordatorio de tarea", message: "Hola {nombre}, tienes una nueva tarea terapéutica asignada en CloudNimbus. 📋", type: "auto" },
  { id: "reschedule", name: "Reagendamiento", message: "Hola {nombre}, necesito reagendar nuestra sesión. ¿Tienes disponibilidad {dia} a las {hora}?", type: "manual" },
  { id: "welcome", name: "Bienvenida", message: "Hola {nombre}, bienvenida/o a CloudNimbus. Aquí podrás ver tus sesiones, tareas y materiales. ☁️", type: "auto" },
];

export default function WhatsAppPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [sending, setSending] = useState(false);
  const [autoEnabled, setAutoEnabled] = useState(true);

  const handleSend = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSending(false);
  };

  const patient = mockPatients.find((p) => p.id === selectedPatient);
  const previewMessage = patient
    ? selectedTemplate.message
        .replace("{nombre}", patient.name)
        .replace("{hora}", "18:00")
        .replace("{dia}", "el jueves")
    : selectedTemplate.message;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">WhatsApp</h2>
          <p className="text-slate-500 text-sm">Recordatorios automáticos y mensajes directos</p>
        </div>
        <Button variant="secondary" size="sm">
          <Settings size={15} /> Configurar API
        </Button>
      </div>

      {/* Connection status */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <div>
            <p className="font-semibold text-emerald-800 text-sm">WhatsApp Business conectado</p>
            <p className="text-xs text-emerald-600">Meta WhatsApp Cloud API — Número: +56 9 XXXX XXXX</p>
          </div>
        </div>
        <Badge variant="green">Activo</Badge>
      </div>

      {/* Automations toggle */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Automatizaciones activas
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${autoEnabled ? "bg-emerald-500" : "bg-slate-200"}`}
              onClick={() => setAutoEnabled(!autoEnabled)}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${autoEnabled ? "translate-x-6" : "translate-x-0"}`} />
            </div>
            <span className="text-sm font-medium text-slate-700">
              {autoEnabled ? "Habilitado" : "Deshabilitado"}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: Clock, title: "Recordatorio 24h antes", desc: "Enviar recordatorio 24 horas antes de cada sesión", enabled: true, color: "sky" },
            { icon: Clock, title: "Recordatorio 2h antes", desc: "Segundo recordatorio 2 horas antes de la sesión", enabled: true, color: "sky" },
            { icon: CheckCircle, title: "Confirmación de reserva", desc: "Confirmar automáticamente al agendar una sesión", enabled: true, color: "emerald" },
            { icon: MessageCircle, title: "Nueva tarea asignada", desc: "Notificar al paciente cuando se le asigna una tarea", enabled: false, color: "violet" },
          ].map(({ icon: Icon, title, desc, enabled, color }) => (
            <div key={title} className={`flex items-center gap-3 p-4 rounded-xl border ${enabled ? "bg-sky-50/50 border-sky-100" : "bg-slate-50 border-slate-100"}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${enabled ? "bg-sky-100" : "bg-slate-100"}`}>
                <Icon size={16} className={enabled ? "text-sky-600" : "text-slate-400"} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{title}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${enabled ? "bg-emerald-400" : "bg-slate-300"}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send message */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6">
          <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Send size={16} className="text-sky-500" /> Enviar mensaje
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Paciente</label>
              <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent">
                <option value="">Seleccionar paciente</option>
                {mockPatients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} {p.lastName} — {p.phone}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Plantilla</label>
              <div className="space-y-2">
                {templates.map((t) => (
                  <button key={t.id} type="button" onClick={() => setSelectedTemplate(t)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${selectedTemplate.id === t.id ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-slate-800">{t.name}</span>
                      <Badge variant={t.type === "auto" ? "blue" : "gray"}>{t.type === "auto" ? "Auto" : "Manual"}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp preview */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Vista previa del mensaje</label>
              <div className="bg-[#075E54] rounded-2xl p-4">
                <div className="bg-[#DCF8C6] rounded-xl rounded-tl-sm p-3 max-w-xs ml-auto">
                  <p className="text-sm text-slate-800 leading-relaxed">{previewMessage}</p>
                  <p className="text-[10px] text-slate-500 text-right mt-1.5">
                    {new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })} ✓✓
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleSend} loading={sending} disabled={!selectedPatient} className="w-full justify-center">
              <Send size={16} /> Enviar mensaje
            </Button>
          </div>
        </div>

        {/* Message log */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6">
          <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
            <MessageCircle size={16} className="text-slate-500" /> Historial de mensajes
          </h3>

          <div className="space-y-3">
            {mockWhatsAppLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Avatar name={`${log.patient?.name} ${log.patient?.lastName}`} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800 text-sm">{log.patient?.name} {log.patient?.lastName}</p>
                    {log.status === "SENT" ? (
                      <CheckCircle size={14} className="text-emerald-500" />
                    ) : log.status === "FAILED" ? (
                      <XCircle size={14} className="text-red-500" />
                    ) : (
                      <Clock size={14} className="text-amber-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{log.message}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Phone size={9} /> {log.phone}
                    </span>
                    <span className="text-[10px] text-slate-400">{log.sentAt ? formatDateTime(log.sentAt) : "Pendiente"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm text-slate-500 hover:text-sky-600 font-medium transition-colors">
            Ver historial completo <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
