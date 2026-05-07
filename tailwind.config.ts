import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05080f",
          900: "#0a0f1e",
          800: "#0f1628",
          700: "#1a2238",
          600: "#252e48",
        },
        amber: {
          glow: "#f59e0b",
          soft: "#fbbf24",
          deep: "#b45309",
        },
        bone: "#e6e9f0",
        muted: "#7c869b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "bg-shift": "bgShift 20s ease infinite",
        "blink": "blink 1s step-end infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        bgShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 158, 11, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(245, 158, 11, 0.35)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "amber-glow":
          "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
