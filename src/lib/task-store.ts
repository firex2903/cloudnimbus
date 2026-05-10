"use client";
import { mockTasks } from "./mock-data";
import type { Task } from "@/types";

const KEY = "cn_tasks";

function load(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(tasks: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function getAllTasks(): Task[] {
  const local = load();
  const ids = new Set(local.map((t) => t.id));
  return [...local, ...mockTasks.filter((t) => !ids.has(t.id))];
}

export function addTask(task: Task) {
  const current = load();
  save([task, ...current]);
}
