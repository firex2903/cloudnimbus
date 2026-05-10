import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CloudNimbus — Plataforma para Psicólogos",
  description: "Gestiona pacientes, sesiones y tareas terapéuticas con la plataforma SaaS más moderna para psicólogos.",
  keywords: ["psicología", "gestión de pacientes", "salud mental", "plataforma SaaS"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
