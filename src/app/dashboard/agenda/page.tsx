"use client";
import { useState } from "react";
import { mockSessions } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatTime } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Video, MapPin, Plus, Calendar, Clock } from "lucide-react";

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function AgendaPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getSessionsForDay = (day: number) => {
    return mockSessions.filter((s) => {
      const d = new Date(s.startTime);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  const selectedDaySessions = selectedDay ? getSessionsForDay(selectedDay) : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Agenda</h2>
          <p className="text-slate-500 text-sm">{MONTHS[month]} {year}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {(["month", "week", "day"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${view === v ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                {v === "month" ? "Mes" : v === "week" ? "Semana" : "Día"}
              </button>
            ))}
          </div>
          <Button size="sm"><Plus size={15} /> Nueva sesión</Button>
        </div>
      </div>

      {/* Calendly integration banner */}
      <div className="bg-gradient-to-r from-violet-50 to-sky-50 border border-violet-200 rounded-2xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
            <Calendar size={18} className="text-violet-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Integración con Calendly</p>
            <p className="text-xs text-slate-500">Conecta tu cuenta para sincronizar reservas automáticamente</p>
          </div>
        </div>
        <Button variant="secondary" size="sm">Conectar Calendly</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Navigation */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">{MONTHS[month]} {year}</h3>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <ChevronLeft size={18} className="text-slate-600" />
              </button>
              <button onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                Hoy
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <ChevronRight size={18} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS.map((d) => (
              <div key={d} className="py-3 text-center text-xs font-semibold text-slate-400">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {/* Empty cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square border-b border-r border-slate-50 p-1" />
            ))}
            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              const daySessions = getSessionsForDay(day);

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square border-b border-r border-slate-50 p-1.5 cursor-pointer group transition-colors ${isSelected ? "bg-sky-50" : "hover:bg-slate-50"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 transition-colors ${
                    isToday ? "bg-sky-500 text-white" : isSelected ? "bg-sky-100 text-sky-700" : "text-slate-700 group-hover:bg-slate-100"
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {daySessions.slice(0, 2).map((s, si) => (
                      <div key={si} className={`h-1.5 rounded-full ${s.type === "ONLINE" ? "bg-sky-400" : "bg-violet-400"}`} />
                    ))}
                    {daySessions.length > 2 && (
                      <div className="text-[9px] text-slate-400">+{daySessions.length - 2}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
        <div className="space-y-4">
          {/* Selected day */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-bold text-slate-800 mb-4">
              {selectedDay ? `${selectedDay} de ${MONTHS[month]}` : "Selecciona un día"}
            </h3>
            {selectedDaySessions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar size={32} className="mx-auto mb-2 text-slate-200" />
                <p className="text-sm text-slate-400">Sin sesiones programadas</p>
                <button className="mt-3 text-sm text-sky-600 font-medium hover:text-sky-700">+ Agendar sesión</button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDaySessions.map((session) => (
                  <div key={session.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-10 rounded-full ${session.type === "ONLINE" ? "bg-sky-500" : "bg-violet-500"}`} />
                    </div>
                    <Avatar name={`${session.patient?.name} ${session.patient?.lastName}`} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{session.patient?.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock size={11} />
                        {formatTime(session.startTime)} — {formatTime(session.endTime)}
                      </div>
                    </div>
                    {session.type === "ONLINE" ? (
                      <Video size={14} className="text-sky-500" />
                    ) : (
                      <MapPin size={14} className="text-violet-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming sessions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
            <h3 className="font-bold text-slate-800 mb-4">Próximas sesiones</h3>
            <div className="space-y-3">
              {mockSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-3">
                  <div className="text-center w-10">
                    <div className="text-lg font-bold text-sky-600">{new Date(session.startTime).getDate()}</div>
                    <div className="text-[10px] text-slate-400 uppercase">{MONTHS[new Date(session.startTime).getMonth()].slice(0, 3)}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{session.patient?.name} {session.patient?.lastName}</p>
                    <p className="text-xs text-slate-500">{formatTime(session.startTime)}</p>
                  </div>
                  {session.type === "ONLINE" ? (
                    <Badge variant="blue">Online</Badge>
                  ) : (
                    <Badge variant="purple">Presencial</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
