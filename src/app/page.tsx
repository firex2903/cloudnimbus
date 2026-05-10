import Link from "next/link";
import { Star, ArrowRight, MessageCircle, CheckCircle, Shield, Heart, Sparkles, Download, BookOpen } from "lucide-react";

const WA_LINK = "https://wa.link/hyhk37";
const IG_LINK = "https://instagram.com/ps.cloudnimbus";

// ── Cloud SVG ─────────────────────────────────────────────────────────────────
function CloudDeco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 117" fill="none" className={className}>
      <path d="M150 90a30 30 0 000-60 3 3 0 01-3-3A46 46 0 0056.2 38A34 34 0 1034 98h116z" fill="currentColor" />
    </svg>
  );
}

// ── Logo ──────────────────────────────────────────────────────────────────────
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path d="M38 30a7 7 0 000-14 1 1 0 01-1-1 11 11 0 00-21.8 2.2A8 8 0 1010 34h28z" fill="url(#lg)" />
      <circle cx="36" cy="16" r="1.8" fill="white" opacity="0.8" />
      <circle cx="32" cy="12" r="1.1" fill="white" opacity="0.5" />
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
            CloudNimbus
          </span>
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          {[
            { label: "Sobre mí", href: "#sobre-mi" },
            { label: "Servicios", href: "#servicios" },
            { label: "Testimonios", href: "#testimonios" },
            { label: "FAQ", href: "#faq" },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              className="px-3.5 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="hidden sm:block text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">
            Ingresar
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">
            <MessageCircle size={15} />
            <span className="hidden sm:inline">Agendar sesión</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-sky-50 via-violet-50/30 to-rose-50/20">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/4" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating cloud decor */}
      <CloudDeco className="absolute top-28 right-8 md:right-16 w-40 md:w-56 text-sky-200/60 animate-float pointer-events-none" />
      <CloudDeco className="absolute bottom-20 left-4 md:left-12 w-28 md:w-36 text-violet-200/50 animate-float-slow pointer-events-none" />
      <CloudDeco className="absolute top-1/2 left-1/4 w-16 text-sky-100/80 animate-float pointer-events-none hidden lg:block" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center w-full">
        {/* Left */}
        <div className="animate-slide-up">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-sky-200 text-sky-700 text-sm font-semibold rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Psicóloga online · Santiago, Chile 🌿
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-5">
            Un espacio seguro<br />
            <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-rose-400 bg-clip-text text-transparent">
              para ser tú
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-3">
            Para quienes sienten demasiado y cargan demasiado.
          </p>
          <p className="text-base text-slate-500 leading-relaxed mb-8">
            Hola, soy <strong className="text-slate-700">Ps. Claudia Araya</strong>. Acompaño a <strong className="text-slate-700">mujeres y disidencias</strong> en procesos de ansiedad, duelo, burnout y bienestar emocional, con un enfoque cálido, cercano y sin juicios.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <MessageCircle size={19} /> Hablar por WhatsApp
            </a>
            <a href="#servicios"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-slate-700 font-semibold text-base rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              Ver servicios <ArrowRight size={16} />
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle size={15} className="text-emerald-500 flex-shrink-0" /> Sesiones 100% online</span>
            <span className="flex items-center gap-1.5"><Shield size={15} className="text-sky-500 flex-shrink-0" /> Espacio confidencial</span>
            <span className="flex items-center gap-1.5"><Heart size={15} className="text-rose-400 flex-shrink-0" /> Para mujeres y disidencias</span>
          </div>
        </div>

        {/* Right — card */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-200/40 to-violet-200/30 rounded-3xl blur-2xl scale-105 pointer-events-none" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white shadow-2xl overflow-hidden">
              {/* Header band */}
              <div className="bg-gradient-to-r from-sky-400 to-violet-500 px-7 py-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <LogoMark size={28} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Ps. Claudia Araya</p>
                  <p className="text-white/75 text-xs">Psicóloga Clínica · Santiago, Chile</p>
                </div>
              </div>

              <div className="p-7">

              {/* What she works on */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Acompaño en:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Ansiedad", "Burnout", "Duelo", "Autoestima", "Vínculos", "Estrés", "Regulación emocional", "Crisis vitales"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-sky-50 border border-sky-100 text-sky-700 text-xs font-medium rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Credentials mini */}
              <div className="space-y-2 mb-5">
                {[
                  { icon: "🎓", text: "Neuropsicología y Cognición — PUC Chile" },
                  { icon: "💙", text: "Trauma Complejo — ADIPA" },
                  { icon: "🆘", text: "Primeros auxilios psicológicos — ADIPA" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex-shrink-0">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-colors shadow-sm text-sm">
                <MessageCircle size={16} /> Agendar sesión
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="sobre-mi" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Quotes / visual */}
          <div className="space-y-4">
            {[
              {
                text: "Aunque hoy se sienta pesado, también pasará. Confía en tu ritmo.",
                bg: "from-sky-50 to-sky-100/50 border-sky-200",
                size: "text-base font-semibold",
              },
              {
                text: "El duelo no es algo que simplemente pasa con el tiempo, sino un proceso que requiere ser vivido y elaborado emocionalmente.",
                bg: "from-violet-50 to-violet-100/50 border-violet-200",
                size: "text-sm",
              },
              {
                text: "La verdadera fuerza no está en hacerlo todo perfecta, sino en creer en ti misma.",
                bg: "from-rose-50 to-rose-100/50 border-rose-200",
                size: "text-sm",
              },
            ].map(({ text, bg, size }, i) => (
              <div key={i} className={`relative p-5 bg-gradient-to-br ${bg} border rounded-2xl`}>
                <span className="absolute -top-3 -left-1 text-5xl leading-none text-slate-200 font-serif select-none">"</span>
                <p className={`${size} text-slate-700 leading-relaxed italic pl-3`}>{text}</p>
                <p className="text-xs text-slate-400 mt-2 pl-3">— Ps. Claudia Araya</p>
              </div>
            ))}
          </div>

          {/* Text */}
          <div>
            <span className="inline-block px-3 py-1.5 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
              Sobre mí
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-5 leading-tight">
              Psicología cálida y accesible para personas emocionalmente agotadas
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Soy Claudia Araya, psicóloga clínica. Creo profundamente en que cada persona tiene un ritmo único y que sanar es posible cuando nos sentimos acompañadas de verdad — sin apuro y sin juicio.
              </p>
              <p>
                Mi trabajo está especialmente orientado a <strong className="text-slate-800">mujeres y personas de la diversidad sexual y de género</strong>, creando un espacio donde puedas ser tú misma, con todo lo que eso implica.
              </p>
              <p>
                No vas a encontrar aquí un enfoque frío ni hiper técnico. Lo que ofrezco es un acompañamiento humano, con lenguaje cercano, escucha real y herramientas concretas para transitar lo que estás viviendo.
              </p>
              <p>
                Trabajo desde un <strong className="text-slate-800">enfoque integrativo</strong>, con base psicodinámica y herramientas cognitivo-conductuales, para adaptarme a lo que cada proceso necesita.
              </p>
            </div>

            {/* Approach pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Enfoque integrativo", "Base psicodinámica", "Herramientas cognitivo-conductuales", "Perspectiva de género", "Trauma complejo", "Neuropsicología", "Primeros auxilios psicológicos"].map((item) => (
                <span key={item} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-full">{item}</span>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {[
                { org: "PUC Chile", curso: "Neuropsicología y Cognición", año: "2023" },
                { org: "ADIPA", curso: "Psicología Clínica — Trauma Complejo", año: "2024" },
                { org: "ADIPA", curso: "Primeros auxilios psicológicos", año: "2026" },
                { org: "ADIPA", curso: "Abordaje psicoterapéutico en salud mental", año: "2025" },
              ].map(({ org, curso, año }) => (
                <div key={curso} className="p-3 bg-gradient-to-br from-sky-50 to-violet-50 rounded-xl border border-sky-100">
                  <p className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{org} · {año}</p>
                  <p className="text-xs text-slate-700 font-medium mt-0.5 leading-tight">{curso}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function Services() {
  const areas = [
    { emoji: "😰", label: "Ansiedad" },
    { emoji: "🔥", label: "Burnout" },
    { emoji: "💼", label: "Estrés laboral" },
    { emoji: "🌧️", label: "Duelo" },
    { emoji: "🪞", label: "Autoestima" },
    { emoji: "🔗", label: "Dependencia emocional" },
    { emoji: "🌀", label: "Regulación emocional" },
    { emoji: "💞", label: "Vínculos" },
    { emoji: "⚡", label: "Crisis vitales" },
  ];

  return (
    <section id="servicios" className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1.5 bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            ¿En qué puedo acompañarte?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Acompañamiento para momentos donde todo se siente demasiado pesado.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Main service */}
          <div className="md:col-span-2 bg-gradient-to-br from-sky-500 to-violet-600 rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
            <CloudDeco className="absolute -right-8 -top-8 w-40 text-white/10 pointer-events-none" />
            <div className="relative">
              <div className="text-4xl mb-3">🌿</div>
              <h3 className="text-2xl font-bold mb-2">Terapia psicológica online</h3>
              <p className="text-sky-100 text-sm leading-relaxed mb-5">
                Sesiones individuales por videollamada. Un espacio solo tuyo para procesar lo que cargas, a tu ritmo y sin presiones.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {areas.map(({ emoji, label }) => (
                  <span key={label} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 rounded-full text-xs font-medium">
                    {emoji} {label}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-sky-200">
                <span className="flex items-center gap-1.5"><CheckCircle size={13} /> 50 min por sesión</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={13} /> Frecuencia semanal o quincenal</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={13} /> 100% online</span>
              </div>
            </div>
          </div>

          {/* First session */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col">
            <div className="text-4xl mb-3">🌱</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Primera sesión de orientación</h3>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
              Si nunca has ido a psicología o tienes dudas antes de empezar, esta sesión es para ti. Un espacio sin compromiso para conocernos, resolver tus preguntas y ver si hacemos match terapéutico.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-2xl transition-colors text-sm border border-sky-200">
              <MessageCircle size={15} /> Consultar disponibilidad
            </a>
          </div>
        </div>

        {/* Secondary services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4 items-start">
            <div className="text-3xl flex-shrink-0">📄</div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1.5">Recursos gratuitos</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                PDFs descargables, guías de regulación emocional, ejercicios de respiración, journaling emocional y más — disponibles en mi Instagram.
              </p>
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-violet-600 font-semibold hover:text-violet-700 transition-colors">
                <Download size={13} /> Ver recursos en @ps.cloudnimbus
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4 items-start">
            <div className="text-3xl flex-shrink-0">✍️</div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1.5">Contenido y reflexiones</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                Temas de duelo, ansiedad, vínculos y bienestar emocional en lenguaje cercano, sin tecnicismos. Para entenderte mejor antes o durante el proceso.
              </p>
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-violet-600 font-semibold hover:text-violet-700 transition-colors">
                <BookOpen size={13} /> Ver en Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Pricing hint + CTA */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-800 mb-0.5">¿Cuánto cuesta una sesión?</p>
            <p className="text-sm text-slate-500">Los valores y disponibilidad los coordinas directamente por WhatsApp.</p>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-colors shadow-sm text-sm whitespace-nowrap">
            <MessageCircle size={16} /> Consultar valores
          </a>
        </div>
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { icon: "💬", title: "Escríbeme", desc: "Contáctame por WhatsApp. Cuéntame brevemente qué te trae y acordamos un horario." },
    { icon: "📅", title: "Agendamos tu hora", desc: "Elegimos un día y horario que funcione para ti. Recibirás el link de videollamada." },
    { icon: "🌿", title: "Tu primer sesión", desc: "Nos conocemos. Sin presiones. Un espacio para que puedas ser tú misma desde el principio." },
    { icon: "🌱", title: "Caminamos juntas", desc: "El proceso terapéutico se adapta a tus tiempos, tus necesidades y tu propio ritmo." },
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <CloudDeco className="absolute top-8 right-8 w-48 text-slate-800 pointer-events-none" />
      <CloudDeco className="absolute bottom-8 left-8 w-32 text-slate-800 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">¿Cómo empezamos?</h2>
          <p className="text-slate-400 text-lg">Dar el primer paso es lo más difícil. Yo me encargo del resto.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map(({ icon, title, desc }, i) => (
            <div key={title} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-700 to-transparent z-0" />
              )}
              <div className="relative z-10 text-center p-5">
                <div className="w-16 h-16 mx-auto bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-3xl mb-4">
                  {icon}
                </div>
                <div className="text-xs font-bold text-sky-400 mb-1 uppercase tracking-widest">0{i + 1}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <MessageCircle size={20} /> Quiero empezar
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    initial: "V.M.",
    role: "Proceso de duelo",
    rating: 5,
    text: "Claudia crea un espacio donde realmente te sentís libre de ser. Llegué muy perdida y fui encontrando mi camino gracias a su acompañamiento. No juzga, escucha de verdad. Es diferente a lo que esperaba de la terapia.",
  },
  {
    initial: "C.R.",
    role: "Ansiedad y autoestima",
    rating: 5,
    text: "Las sesiones online funcionaron perfectamente para mí. Claudia es profesional y al mismo tiempo muy cercana. Por primera vez sentí que tenía un espacio realmente mío, sin tener que explicarme demasiado.",
  },
  {
    initial: "J.T.",
    role: "Burnout y estrés laboral",
    rating: 5,
    text: "Gracias a este proceso entendí que sanar tiene su propio ritmo. Su lenguaje es humano, nada clínico ni distante. La recomiendo especialmente si sientes que cargas demasiado sola.",
  },
];

function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Lo que dicen quienes han pasado por aquí
          </h2>
          <p className="text-slate-500">Testimonios anónimos compartidos con permiso.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map(({ initial, role, rating, text }) => (
            <div key={initial} className="bg-gradient-to-br from-sky-50/80 to-violet-50/60 border border-sky-100 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-sky-100">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {initial[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{initial}</p>
                  <p className="text-xs text-slate-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-emerald-300 text-emerald-700 font-semibold rounded-2xl hover:bg-emerald-50 hover:-translate-y-0.5 transition-all shadow-sm">
            <MessageCircle size={15} /> Quiero saber más — escríbeme
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "¿Las sesiones son presenciales u online?",
    a: "Todas las sesiones son 100% online, por videollamada. Puedes conectarte desde cualquier lugar donde tengas privacidad y buena conexión. Sin desplazamientos.",
  },
  {
    q: "¿Cuánto dura cada sesión?",
    a: "Cada sesión tiene una duración de aproximadamente 50 minutos. La frecuencia recomendada es semanal, aunque se adapta a tus tiempos y posibilidades.",
  },
  {
    q: "¿Qué pasa en la primera sesión?",
    a: "Es una instancia de conocernos. Me cuentas qué te trae, resolvemos tus dudas y vemos si hacemos match terapéutico. Sin presiones ni compromisos.",
  },
  {
    q: "¿Cuáles son los métodos de pago?",
    a: "Los métodos de pago los coordinamos directamente por WhatsApp. Generalmente incluyen transferencia bancaria. Consulta disponibilidad y valores directamente conmigo.",
  },
  {
    q: "Nunca he ido a psicología — ¿puedo empezar igual?",
    a: "¡Claro! No necesitas experiencia previa ni saber exactamente qué te pasa. Muchas personas llegan sin saber bien por dónde partir, y eso es completamente válido.",
  },
  {
    q: "¿Atiende a personas de la comunidad LGBTQ+?",
    a: "Sí. Mi espacio está especialmente orientado a mujeres y disidencias, con un enfoque afirmativo y libre de prejuicios respecto a la identidad y orientación sexual.",
  },
  {
    q: "¿Todo lo que cuente es confidencial?",
    a: "Sí, absolutamente. La confidencialidad es un principio ético fundamental de la psicología. Lo que conversemos en sesión queda entre nosotras, con las excepciones éticas y legales que te explicaré desde el inicio.",
  },
  {
    q: "¿Cómo agendo mi sesión?",
    a: "Simplemente escríbeme por WhatsApp a través del botón de esta página. Te respondo a la brevedad para coordinar un horario y contarte todo lo necesario.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1.5 bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">Dudas frecuentes</h2>
          <p className="text-slate-500 text-sm">Si no encuentras tu pregunta aquí,{" "}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">
              escríbeme por WhatsApp
            </a>.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer">
              <summary className="flex items-center justify-between px-6 py-5 font-semibold text-slate-800 text-sm list-none hover:bg-slate-50/80 transition-colors select-none">
                <span>{q}</span>
                <span className="ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 group-open:bg-sky-100 text-slate-400 group-open:text-sky-600 font-bold text-base transition-all group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 pt-1 text-sm text-slate-500 leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Final ─────────────────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-sky-500 via-violet-500 to-rose-400">
      {/* decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <CloudDeco className="absolute top-4 right-12 w-52 text-white animate-float" />
        <CloudDeco className="absolute bottom-4 left-8 w-36 text-white animate-float-slow" />
        <CloudDeco className="absolute top-1/2 left-1/2 w-24 text-white animate-float" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
          <Heart size={14} /> Atención online · Santiago, Chile
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
          Tu bienestar importa.<br />Empecemos juntas.
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
          No tienes que tener todo claro para dar el primer paso. Escríbeme cuando estés lista, o incluso cuando no lo estés todavía.
        </p>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-600 font-bold text-xl rounded-2xl shadow-2xl hover:-translate-y-1 hover:shadow-3xl transition-all duration-200">
          <MessageCircle size={24} /> Agendar sesión por WhatsApp
        </a>
        <p className="text-white/60 text-sm mt-5">@ps.cloudnimbus · Respondo a la brevedad</p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <LogoMark size={28} />
          <div>
            <span className="font-bold text-white text-sm">CloudNimbus</span>
            <span className="text-slate-500 text-sm"> · Ps. Claudia Araya</span>
          </div>
        </div>
        <nav className="flex items-center gap-5 flex-wrap justify-center">
          <a href="#sobre-mi" className="text-sm text-slate-500 hover:text-white transition-colors">Sobre mí</a>
          <a href="#servicios" className="text-sm text-slate-500 hover:text-white transition-colors">Servicios</a>
          <a href="#faq" className="text-sm text-slate-500 hover:text-white transition-colors">FAQ</a>
          <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-violet-400 transition-colors">Instagram</a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
            <MessageCircle size={13} /> WhatsApp
          </a>
          <Link href="/auth/login" className="text-sm text-slate-500 hover:text-white transition-colors">Ingresar</Link>
        </nav>
        <p className="text-slate-600 text-xs">© 2024 CloudNimbus · Santiago, Chile</p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}
