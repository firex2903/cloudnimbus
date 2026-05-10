"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTasks } from "@/lib/task-store";
import type { Task } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { Plus, Search, CheckCircle2, Clock, AlertCircle, ClipboardList, Calendar, FileText, Link as LinkIcon } from "lucide-react";

const typeIcons: Record<string, string> = {
  TEXT: "📝", CHECKLIST: "✅", REFLECTION: "💭",
  EMOTIONAL_DIARY: "📖", FORM: "📋", VIDEO: "🎬",
};
const typeLabels: Record<string, string> = {
  TEXT: "Texto", CHECKLIST: "Checklist", REFLECTION: "Reflexión",
  EMOTIONAL_DIARY: "Diario emocional", FORM: "Formulario", VIDEO: "Video",
};

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => { setTasks(getAllTasks()); }, []);

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    ALL: tasks.length,
    PENDING: tasks.filter((t) => t.status === "PENDING").length,
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    COMPLETED: tasks.filter((t) => t.status === "COMPLETED").length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tareas terapéuticas</h2>
          <p className="text-slate-500 text-sm">{tasks.length} tareas en total</p>
        </div>
        <Link href="/dashboard/tasks/new">
          <Button><Plus size={16} /> Nueva tarea</Button>
        </Link>
      </div>

      {/* Kanban-style stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { key: "ALL", label: "Todas", color: "bg-slate-500", light: "bg-slate-50 border-slate-200" },
          { key: "PENDING", label: "Pendientes", color: "bg-amber-500", light: "bg-amber-50 border-amber-200" },
          { key: "IN_PROGRESS", label: "En progreso", color: "bg-sky-500", light: "bg-sky-50 border-sky-200" },
          { key: "COMPLETED", label: "Completadas", color: "bg-emerald-500", light: "bg-emerald-50 border-emerald-200" },
        ].map(({ key, label, color, light }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${filter === key ? `${light} border-current` : "bg-white border-slate-100 hover:border-slate-200"}`}
          >
            <div className={`w-3 h-3 rounded-full ${color} mb-2`} />
            <div className="text-2xl font-bold text-slate-800">{counts[key as keyof typeof counts]}</div>
            <div className="text-sm text-slate-500">{label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar tareas..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>

      {/* Tasks list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
            <ClipboardList size={48} className="mx-auto mb-4 text-slate-200" />
            <p className="text-slate-400">No hay tareas que coincidan</p>
          </div>
        ) : filtered.map((task) => (
          <div key={task.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-2xl">{typeIcons[task.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-slate-800">{task.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{typeLabels[task.type]}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={task.status === "COMPLETED" ? "green" : task.status === "IN_PROGRESS" ? "blue" : "orange"}>
                      {task.status === "COMPLETED" ? "Completada" : task.status === "IN_PROGRESS" ? "En progreso" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
                {task.description && <p className="text-sm text-slate-500 mb-3 line-clamp-2">{task.description}</p>}

                {/* Checklist preview */}
                {task.checklistItems && (
                  <div className="space-y-1.5 mb-3">
                    {task.checklistItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${item.completed ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                          {item.completed && <span className="text-white text-[8px]">✓</span>}
                        </div>
                        <span className={`text-xs ${item.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Avatar name={`${task.patient?.name} ${task.patient?.lastName}`} size="xs" />
                    {task.patient?.name} {task.patient?.lastName}
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar size={11} /> Vence: {formatDate(task.dueDate)}
                    </div>
                  )}
                  {task.fileUrl && <div className="flex items-center gap-1"><FileText size={11} /> Archivo adjunto</div>}
                  {task.externalLink && <div className="flex items-center gap-1"><LinkIcon size={11} /> Link externo</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
