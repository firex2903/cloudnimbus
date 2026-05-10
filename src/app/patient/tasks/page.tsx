"use client";
import { useState } from "react";
import { mockTasks } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Calendar, Upload, ChevronDown, ChevronUp } from "lucide-react";

const patientTasks = mockTasks.filter((t) => t.patientId === "1");

const typeEmoji: Record<string, string> = {
  TEXT: "📝", CHECKLIST: "✅", REFLECTION: "💭",
  EMOTIONAL_DIARY: "📖", FORM: "📋", VIDEO: "🎬",
};

export default function PatientTasksPage() {
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpandedTask(expandedTask === id ? null : id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mis tareas</h1>
        <p className="text-slate-500 text-sm">{patientTasks.length} tareas asignadas por tu psicóloga</p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">Tu progreso</span>
          <span className="text-sm font-bold text-sky-600">
            {patientTasks.filter((t) => t.status === "COMPLETED").length}/{patientTasks.length} completadas
          </span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${(patientTasks.filter((t) => t.status === "COMPLETED").length / patientTasks.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">¡Sigue así! Cada tarea te acerca a tu bienestar.</p>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {patientTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div
              className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => toggle(task.id)}
            >
              <div className="text-2xl">{typeEmoji[task.type]}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800">{task.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  {task.dueDate && (
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar size={11} /> Vence: {formatDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={task.status === "COMPLETED" ? "green" : task.status === "IN_PROGRESS" ? "blue" : "orange"}>
                  {task.status === "COMPLETED" ? "✓ Completada" : task.status === "IN_PROGRESS" ? "En progreso" : "Pendiente"}
                </Badge>
                {expandedTask === task.id ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </div>
            </div>

            {expandedTask === task.id && (
              <div className="px-5 pb-5 border-t border-slate-100">
                <div className="pt-4 space-y-4">
                  {task.description && (
                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                      <p className="text-sm font-semibold text-sky-700 mb-1">Instrucciones de tu psicóloga:</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{task.description}</p>
                    </div>
                  )}

                  {/* Checklist */}
                  {task.checklistItems && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-700">Lista de verificación:</p>
                      {task.checklistItems.map((item) => (
                        <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              completedItems[item.id] || item.completed
                                ? "bg-emerald-500 border-emerald-500"
                                : "border-slate-300 group-hover:border-sky-400"
                            }`}
                            onClick={() => setCompletedItems((c) => ({ ...c, [item.id]: !c[item.id] }))}
                          >
                            {(completedItems[item.id] || item.completed) && (
                              <CheckCircle2 size={12} className="text-white" />
                            )}
                          </div>
                          <span className={`text-sm ${completedItems[item.id] || item.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Text response */}
                  {(task.type === "TEXT" || task.type === "REFLECTION" || task.type === "EMOTIONAL_DIARY") && task.status !== "COMPLETED" && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tu respuesta:</label>
                      <textarea
                        value={responses[task.id] || ""}
                        onChange={(e) => setResponses((r) => ({ ...r, [task.id]: e.target.value }))}
                        placeholder="Escribe tu respuesta aquí..."
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
                      />
                    </div>
                  )}

                  {/* Upload option */}
                  {task.status !== "COMPLETED" && (
                    <div className="flex items-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-sky-400 hover:bg-sky-50/50 transition-all">
                      <Upload size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-500">Adjuntar archivo (opcional)</span>
                    </div>
                  )}

                  {task.status !== "COMPLETED" && (
                    <div className="flex gap-3">
                      <Button variant="secondary" size="sm">Guardar borrador</Button>
                      <Button size="sm">
                        <CheckCircle2 size={15} /> Marcar como completada
                      </Button>
                    </div>
                  )}

                  {task.status === "COMPLETED" && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <p className="text-sm font-semibold text-emerald-700">¡Tarea completada! Buen trabajo 🎉</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
