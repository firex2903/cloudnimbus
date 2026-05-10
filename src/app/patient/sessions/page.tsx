import { mockSessions } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils";
import { Video, MapPin, Clock, Calendar, ExternalLink } from "lucide-react";

export default function PatientSessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mis sesiones</h1>
        <p className="text-slate-500 text-sm">Historial y próximas citas con tu psicóloga</p>
      </div>

      <div className="space-y-3">
        {mockSessions.map((session) => {
          const isUpcoming = new Date(session.startTime) > new Date();
          return (
            <div key={session.id}
              className={`bg-white rounded-2xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 ${isUpcoming ? "border-sky-200 bg-sky-50/30" : "border-slate-100"}`}>
              <div className="flex items-start gap-4">
                {/* Date column */}
                <div className="flex-shrink-0 text-center w-16 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="text-2xl font-bold text-sky-600">{new Date(session.startTime).getDate()}</div>
                  <div className="text-xs text-slate-400 uppercase">
                    {new Date(session.startTime).toLocaleString("es", { month: "short" })}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-800">{session.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={13} /> {formatTime(session.startTime)} — {formatTime(session.endTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} /> {formatDate(session.startTime)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {session.type === "ONLINE" ? (
                        <Badge variant="blue"><Video size={10} /> Online</Badge>
                      ) : (
                        <Badge variant="purple"><MapPin size={10} /> Presencial</Badge>
                      )}
                      {isUpcoming ? (
                        <Badge variant="green">Próxima</Badge>
                      ) : (
                        <Badge variant="gray">Realizada</Badge>
                      )}
                    </div>
                  </div>

                  {session.meetingUrl && isUpcoming && (
                    <a href={session.meetingUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
                      <ExternalLink size={14} /> Unirse a la videollamada
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
