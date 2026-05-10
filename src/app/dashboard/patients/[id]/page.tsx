import { mockPatients, mockSessions, mockTasks, mockClinicalRecords } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft, Mail, Phone, Calendar, Tag, FileText, ClipboardList,
  Video, MapPin, CheckCircle2, Clock, AlertCircle, Edit, MessageCircle, Plus
} from "lucide-react";
import { notFound } from "next/navigation";

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const patient = mockPatients.find((p) => p.id === params.id);
  if (!patient) notFound();

  const patientSessions = mockSessions.filter((s) => s.patientId === params.id);
  const patientTasks = mockTasks.filter((t) => t.patientId === params.id);
  const patientRecords = mockClinicalRecords.filter((r) => r.patientId === params.id);

  const completedTasks = patientTasks.filter((t) => t.status === "COMPLETED").length;
  const adherence = patientTasks.length ? Math.round((completedTasks / patientTasks.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back */}
      <Link href="/dashboard/patients" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors">
        <ArrowLeft size={16} /> Volver a pacientes
      </Link>

      {/* Profile header */}
      <div className="bg-gradient-to-br from-sky-50 to-violet-50 rounded-2xl border border-sky-100 p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Avatar name={`${patient.name} ${patient.lastName}`} size="xl" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{patient.name} {patient.lastName}</h1>
              <Badge variant={patient.status === "ACTIVE" ? "green" : patient.status === "PAUSED" ? "orange" : "gray"}>
                {patient.status === "ACTIVE" ? "Activo" : patient.status === "PAUSED" ? "En pausa" : "Inactivo"}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" />{patient.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" />{patient.phone}</span>
              {patient.birthDate && (
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400" />{formatDate(patient.birthDate)}</span>
              )}
            </div>
            {patient.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {patient.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/80 text-slate-600 text-xs rounded-full border border-slate-200">
                    <Tag size={10} />{tag}
                  </span>
                ))}
              </div>
            )}
            {patient.notes && <p className="text-sm text-slate-600 max-w-xl">{patient.notes}</p>}
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/patients/${patient.id}/edit`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Edit size={15} /> Editar
              </button>
            </Link>
            <Link href="/dashboard/whatsapp">
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-xl text-sm font-semibold text-white hover:bg-emerald-600 transition-colors shadow-sm">
                <MessageCircle size={15} /> WhatsApp
              </button>
            </Link>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-sky-200">
          {[
            { label: "Sesiones", value: patientSessions.length, icon: "📅" },
            { label: "Tareas", value: patientTasks.length, icon: "✅" },
            { label: "Completadas", value: `${completedTasks}/${patientTasks.length}`, icon: "🎯" },
            { label: "Adherencia", value: `${adherence}%`, icon: "📊" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white/70 rounded-xl p-3 text-center border border-white/50">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xl font-bold text-slate-800">{value}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video size={16} className="text-violet-500" /> Sesiones
            </CardTitle>
            <button className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-lg transition-colors">
              <Plus size={12} /> Nueva
            </button>
          </CardHeader>
          <CardBody className="divide-y divide-slate-50 py-0">
            {patientSessions.length === 0 ? (
              <EmptyState icon={<Video size={32} />} message="No hay sesiones programadas" />
            ) : patientSessions.map((session) => (
              <div key={session.id} className="py-4 flex items-center gap-3">
                <div className={`w-2 h-10 rounded-full flex-shrink-0 ${session.status === "COMPLETED" ? "bg-emerald-400" : session.status === "SCHEDULED" ? "bg-sky-400" : "bg-slate-200"}`} />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{session.title}</p>
                  <p className="text-xs text-slate-500">{formatDateTime(session.startTime)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {session.type === "ONLINE" ? (
                    <span className="flex items-center gap-1 text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-full"><Video size={11} /> Online</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-violet-600 bg-violet-50 px-2 py-1 rounded-full"><MapPin size={11} /> Presencial</span>
                  )}
                  {session.meetingUrl && (
                    <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-sky-600 font-semibold hover:text-sky-700">Unirse</a>
                  )}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList size={16} className="text-amber-500" /> Tareas terapéuticas
            </CardTitle>
            <Link href="/dashboard/tasks/new">
              <button className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-lg transition-colors">
                <Plus size={12} /> Nueva
              </button>
            </Link>
          </CardHeader>
          <CardBody className="divide-y divide-slate-50 py-0">
            {patientTasks.length === 0 ? (
              <EmptyState icon={<ClipboardList size={32} />} message="No hay tareas asignadas" />
            ) : patientTasks.map((task) => (
              <div key={task.id} className="py-4 flex items-center gap-3">
                {task.status === "COMPLETED" ? <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  : task.status === "IN_PROGRESS" ? <Clock size={18} className="text-sky-500 flex-shrink-0" />
                  : <AlertCircle size={18} className="text-amber-500 flex-shrink-0" />}
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{task.title}</p>
                  <p className="text-xs text-slate-500 capitalize">{task.type.replace("_", " ").toLowerCase()}</p>
                </div>
                <Badge variant={task.status === "COMPLETED" ? "green" : task.status === "IN_PROGRESS" ? "blue" : "orange"}>
                  {task.status === "COMPLETED" ? "Listo" : task.status === "IN_PROGRESS" ? "En curso" : "Pendiente"}
                </Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Clinical Records */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText size={16} className="text-rose-500" /> Fichas clínicas
              <span className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full font-normal">Solo psicóloga</span>
            </CardTitle>
            <Link href="/dashboard/clinical/new">
              <button className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-lg transition-colors">
                <Plus size={12} /> Nueva ficha
              </button>
            </Link>
          </CardHeader>
          <CardBody className="divide-y divide-slate-50 py-0">
            {patientRecords.length === 0 ? (
              <EmptyState icon={<FileText size={32} />} message="No hay fichas clínicas registradas" />
            ) : patientRecords.map((record) => (
              <div key={record.id} className="py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-rose-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{record.title}</p>
                  <p className="text-xs text-slate-500">{record.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">{formatDate(record.date)}</p>
                  {record.tags?.map((tag) => (
                    <span key={tag} className="inline-block ml-1 px-1.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] rounded">{tag}</span>
                  ))}
                </div>
                <a href={record.url} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold rounded-lg transition-colors">
                  Abrir
                </a>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="py-10 text-center text-slate-300">
      <div className="mb-2 flex justify-center">{icon}</div>
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}
