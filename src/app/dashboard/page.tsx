import Link from "next/link";
import { mockDashboardStats, mockSessions, mockTasks } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDateTime, formatTime } from "@/lib/utils";
import {
  Users, Calendar, ClipboardList, MessageCircle, TrendingUp,
  Video, MapPin, ArrowRight, CheckCircle2, Clock, AlertCircle
} from "lucide-react";

const stats = mockDashboardStats;

function StatCard({ title, value, subtitle, icon: Icon, color, href }: {
  title: string; value: string | number; subtitle: string;
  icon: React.ElementType; color: string; href?: string;
}) {
  const content = (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
          <Icon size={20} className="text-white" />
        </div>
        {href && <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />}
      </div>
      <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-600">{title}</div>
      <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

function SessionStatusBadge({ status, type }: { status: string; type: string }) {
  return (
    <div className="flex items-center gap-2">
      {type === "ONLINE" ? (
        <div className="flex items-center gap-1 text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
          <Video size={11} /> Online
        </div>
      ) : (
        <div className="flex items-center gap-1 text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
          <MapPin size={11} /> Presencial
        </div>
      )}
    </div>
  );
}

function TaskStatusIcon({ status }: { status: string }) {
  if (status === "COMPLETED") return <CheckCircle2 size={16} className="text-emerald-500" />;
  if (status === "IN_PROGRESS") return <Clock size={16} className="text-sky-500" />;
  return <AlertCircle size={16} className="text-amber-500" />;
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Pacientes totales"
          value={stats.totalPatients}
          subtitle={`${stats.activePatients} activos`}
          icon={Users}
          color="bg-sky-500"
          href="/dashboard/patients"
        />
        <StatCard
          title="Sesiones esta semana"
          value={stats.sessionsThisWeek}
          subtitle="↑ 2 más que la semana pasada"
          icon={Calendar}
          color="bg-violet-500"
          href="/dashboard/agenda"
        />
        <StatCard
          title="Tareas pendientes"
          value={stats.pendingTasks}
          subtitle="2 vencen hoy"
          icon={ClipboardList}
          color="bg-amber-500"
          href="/dashboard/tasks"
        />
        <StatCard
          title="Recordatorios enviados"
          value={stats.remindersSent}
          subtitle="Este mes"
          icon={MessageCircle}
          color="bg-emerald-500"
          href="/dashboard/whatsapp"
        />
        <div className="bg-gradient-to-br from-sky-500 to-violet-600 rounded-2xl p-5 text-white flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <div className="text-2xl font-bold">92%</div>
            <div className="text-sm font-semibold text-sky-100">Adherencia terapéutica</div>
            <div className="text-xs text-sky-200 mt-0.5">Promedio de tus pacientes</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming sessions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Próximas sesiones</CardTitle>
            <Link href="/dashboard/agenda" className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1">
              Ver agenda <ArrowRight size={14} />
            </Link>
          </CardHeader>
          <CardBody className="divide-y divide-slate-50 py-0">
            {mockSessions.map((session) => (
              <div key={session.id} className="flex items-center gap-4 py-4 group hover:bg-slate-50 -mx-6 px-6 transition-colors cursor-pointer">
                <div className="flex-shrink-0 text-center w-16">
                  <div className="text-2xl font-bold text-sky-600">{new Date(session.startTime).getDate()}</div>
                  <div className="text-xs text-slate-400 uppercase">{new Date(session.startTime).toLocaleString("es", { month: "short" })}</div>
                </div>
                <div className="w-0.5 h-10 bg-slate-100" />
                <Avatar name={`${session.patient?.name} ${session.patient?.lastName}`} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{session.patient?.name} {session.patient?.lastName}</p>
                  <p className="text-xs text-slate-500">{session.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700">{formatTime(session.startTime)}</p>
                  <SessionStatusBadge status={session.status} type={session.type} />
                </div>
                {session.meetingUrl && (
                  <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold rounded-lg transition-colors">
                    Unirse
                  </a>
                )}
              </div>
            ))}
            {mockSessions.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No hay sesiones programadas</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Tasks + Recent patients */}
        <div className="space-y-6">
          {/* Recent tasks */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-base">Tareas recientes</CardTitle>
              <Link href="/dashboard/tasks" className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1">
                Ver todas <ArrowRight size={14} />
              </Link>
            </CardHeader>
            <CardBody className="divide-y divide-slate-50 py-0">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 py-3.5">
                  <TaskStatusIcon status={task.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{task.title}</p>
                    <p className="text-xs text-slate-400">{task.patient?.name} {task.patient?.lastName}</p>
                  </div>
                  <Badge variant={task.status === "COMPLETED" ? "green" : task.status === "IN_PROGRESS" ? "blue" : "orange"}>
                    {task.status === "COMPLETED" ? "Listo" : task.status === "IN_PROGRESS" ? "En curso" : "Pendiente"}
                  </Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Recent patients */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-base">Pacientes recientes</CardTitle>
              <Link href="/dashboard/patients" className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1">
                Ver todos <ArrowRight size={14} />
              </Link>
            </CardHeader>
            <CardBody className="divide-y divide-slate-50 py-0">
              {stats.recentPatients.map((patient) => (
                <Link key={patient.id} href={`/dashboard/patients/${patient.id}`}
                  className="flex items-center gap-3 py-3.5 hover:bg-slate-50 -mx-6 px-6 transition-colors group">
                  <Avatar name={`${patient.name} ${patient.lastName}`} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{patient.name} {patient.lastName}</p>
                    <p className="text-xs text-slate-400">{patient.tags?.[0]}</p>
                  </div>
                  <Badge variant={patient.status === "ACTIVE" ? "green" : patient.status === "PAUSED" ? "orange" : "gray"}>
                    {patient.status === "ACTIVE" ? "Activa" : patient.status === "PAUSED" ? "Pausa" : "Inactiva"}
                  </Badge>
                </Link>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Quick actions */}
      <Card>
        <CardBody className="py-5">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Acciones rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: "/dashboard/patients/new", icon: "👤", label: "Nuevo paciente", color: "bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200" },
              { href: "/dashboard/agenda", icon: "📅", label: "Agendar sesión", color: "bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200" },
              { href: "/dashboard/tasks/new", icon: "✅", label: "Crear tarea", color: "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200" },
              { href: "/dashboard/whatsapp", icon: "💬", label: "Enviar recordatorio", color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200" },
            ].map(({ href, icon, label, color }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-medium text-sm transition-all hover:-translate-y-0.5 ${color}`}>
                <span className="text-xl">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
