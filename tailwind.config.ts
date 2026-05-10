import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CloudNimbus brand palette
        nimbus: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36aaf6",
          500: "#0c8ee7",
          600: "#0070c5",
          700: "#0158a0",
          800: "#064b84",
          900: "#0b3f6e",
          950: "#07274a",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e7fe",
          300: "#7cd4fd",
          400: "#36bffa",
          500: "#0ba5ec",
          600: "#0086c9",
          700: "#026aa2",
          800: "#065986",
          900: "#0b4a6f",
        },
        lavender: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        cloud: {
          50: "#ffffff",
          100: "#f8fafc",
          200: "#f1f5f9",
          300: "#e2e8f0",
          400: "#cbd5e1",
          500: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        nimbus: "0 4px 24px -4px rgba(12, 142, 231, 0.15)",
        "nimbus-lg": "0 8px 40px -8px rgba(12, 142, 231, 0.25)",
        card: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)",
        soft: "0 2px 16px rgba(0,0,0,0.06)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 24px rgba(0,0,0,0.06)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "nimbus-gradient": "linear-gradient(135deg, #0c8ee7 0%, #7c3aed 100%)",
        "sky-gradient": "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%)",
        "cloud-gradient": "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
        "hero-gradient": "radial-gradient(ellipse at 60% 0%, rgba(12,142,231,0.12) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        "mesh": "radial-gradient(at 40% 20%, rgba(12,142,231,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139,92,246,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(7,160,235,0.05) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
