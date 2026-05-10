import Link from "next/link";
import { mockTasks, mockSessions, mockMaterials } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime, formatTime } from "@/lib/utils";
import { ClipboardList, Calendar, Library, CheckCircle2, Clock, AlertCircle, Video, MapPin, ArrowRight, Heart, Sparkles } from "lucide-react";

const patientTasks = mockTasks.filter((t) => t.patientId === "1");
const patientSessions = mockSessions;

export default function PatientHomePage() {
  const pending = patientTasks.filter((t) => t.status !== "COMPLETED");
  const nextSession = patientSessions[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-sky-500 to-violet-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 right-16 w-24 h-24 bg-white/5 rounded-full translate-y-8" />
        <div className="relative">
          <p className="text-sky-100 text-sm mb-1">Buenos días ☀️</p>
          <h1 className="text-3xl font-bold mb-2">Hola, María</h1>
          <p className="text-sky-100 text-sm max-w-sm">Tienes {pending.length} tarea{pending.length !== 1 ? "s" : ""} pendiente{pending.length !== 1 ? "s" : ""} y tu próxima sesión es {nextSession ? "hoy" : "pronto"}.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tareas pendientes", value: pending.length, icon: "✅", color: "amber" },
          { label: "Materiales disponibles", value: mockMaterials.length, icon: "📚", color: "sky" },
          { label: "Próximas sesiones", value: patientSessions.length, icon: "📅", color: "violet" },
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-4 text-center">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-2xl font-bold text-slate-800">{value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Next session */}
      {nextSession && (
        <div className="bg-white rounded-2xl border border-sky-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Calendar size={16} className="text-sky-500" /> Próxima sesión
            </h2>
          </div>
          <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-600">{new Date(nextSession.startTime).getDate()}</div>
              <div className="text-xs text-slate-500 uppercase">
                {new Date(nextSession.startTime).toLocaleString("es", { month: "short" })}
              </div>
            </div>
            <div className="w-0.5 h-12 bg-sky-200" />
            <div className="flex-1">
              <p className="font-bold text-slate-800">{nextSession.title}</p>
              <p className="text-sm text-slate-600">
                {formatTime(nextSession.startTime)} — {formatTime(nextSession.endTime)}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                {nextSession.type === "ONLINE" ? (
                  <Badge variant="blue"><Video size={10} /> Online</Badge>
                ) : (
                  <Badge variant="purple"><MapPin size={10} /> Presencial</Badge>
                )}
              </div>
            </div>
            {nextSession.meetingUrl && (
              <a href={nextSession.meetingUrl} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                Unirse
              </a>
            )}
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList size={16} className="text-amber-500" /> Mis tareas
          </h2>
          <Link href="/patient/tasks" className="text-sm text-sky-600 font-medium flex items-center gap-1 hover:text-sky-700">
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {patientTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-sky-50/50 transition-colors cursor-pointer">
              {task.status === "COMPLETED" ? <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                : task.status === "IN_PROGRESS" ? <Clock size={18} className="text-sky-500 flex-shrink-0" />
                : <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />}
              <div className="flex-1">
                <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{task.description?.slice(0, 60)}...</p>
              </div>
              <Badge variant={task.status === "COMPLETED" ? "green" : task.status === "IN_PROGRESS" ? "blue" : "orange"}>
                {task.status === "COMPLETED" ? "Listo" : task.status === "IN_PROGRESS" ? "En curso" : "Pendiente"}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational card */}
      <div className="bg-gradient-to-br from-violet-50 to-sky-50 border border-violet-100 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Heart size={22} className="text-violet-500" />
        </div>
        <div>
          <p className="font-bold text-slate-800 mb-1 flex items-center gap-2">
            Mensaje de tu psicóloga <Sparkles size={14} className="text-amber-500" />
          </p>
          <p className="text-sm text-slate-600 italic">
            &ldquo;Recuerda que cada pequeño paso cuenta. Estás haciendo un gran trabajo. Nos vemos pronto. 🌤️&rdquo;
          </p>
          <p className="text-xs text-slate-400 mt-1.5">— Dra. Ana López</p>
        </div>
      </div>
    </div>
  );
}
