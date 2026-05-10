import { mockSessions } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatDateTime, formatTime } from "@/lib/utils";
import { Video, MapPin, Clock, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SessionsPage() {
  const upcoming = mockSessions.filter((s) => new Date(s.startTime) > new Date());
  const past = mockSessions.filter((s) => new Date(s.startTime) <= new Date());

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sesiones</h2>
          <p className="text-slate-500 text-sm">{mockSessions.length} sesiones registradas</p>
        </div>
        <Link href="/dashboard/agenda">
          <Button><Plus size={16} /> Agendar sesión</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Programadas", value: upcoming.length, color: "sky" },
          { label: "Completadas", value: 0, color: "emerald" },
          { label: "Canceladas", value: 0, color: "red" },
          { label: "Online", value: mockSessions.filter((s) => s.type === "ONLINE").length, color: "violet" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className={`text-3xl font-bold mb-1 ${color === "sky" ? "text-sky-600" : color === "emerald" ? "text-emerald-600" : color === "red" ? "text-red-600" : "text-violet-600"}`}>{value}</div>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Próximas</h3>
          <div className="space-y-3">
            {upcoming.map((session) => (
              <SessionRow key={session.id} session={session} isUpcoming />
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Historial</h3>
          <div className="space-y-3">
            {past.map((session) => (
              <SessionRow key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}

      {mockSessions.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-slate-400">No hay sesiones registradas</p>
        </div>
      )}
    </div>
  );
}

function SessionRow({ session, isUpcoming }: { session: typeof mockSessions[0]; isUpcoming?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 flex items-center gap-5 ${isUpcoming ? "border-sky-200" : "border-slate-100"}`}>
      <div className="flex-shrink-0 text-center w-16">
        <div className={`text-2xl font-bold ${isUpcoming ? "text-sky-600" : "text-slate-400"}`}>
          {new Date(session.startTime).getDate()}
        </div>
        <div className="text-xs text-slate-400 uppercase">
          {new Date(session.startTime).toLocaleString("es", { month: "short" })}
        </div>
      </div>
      <div className="w-0.5 h-12 bg-slate-100" />
      <Avatar name={`${session.patient?.name} ${session.patient?.lastName}`} size="md" />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-800">{session.patient?.name} {session.patient?.lastName}</h3>
        <p className="text-sm text-slate-500">{session.title}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock size={11} />{formatTime(session.startTime)} — {formatTime(session.endTime)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {session.type === "ONLINE" ? (
          <Badge variant="blue"><Video size={10} /> Online</Badge>
        ) : (
          <Badge variant="purple"><MapPin size={10} /> Presencial</Badge>
        )}
        {isUpcoming ? <Badge variant="green">Programada</Badge> : <Badge variant="gray">Completada</Badge>}
        {session.meetingUrl && (
          <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-semibold rounded-lg transition-colors">
            <ExternalLink size={11} /> Unirse
          </a>
        )}
      </div>
    </div>
  );
}
