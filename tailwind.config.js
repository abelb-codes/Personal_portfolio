/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      colors: {
        shell: {
          950: "#07090d",
          900: "#0b0f16",
          850: "#101722",
          800: "#141d2a",
        },
        signal: {
          cyan: "#5eead4",
          blue: "#60a5fa",
          green: "#8bd450",
          amber: "#f8c555",
          rose: "#fb7185",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(94, 234, 212, 0.12)",
      },
    },
  },
  plugins: [],
};
