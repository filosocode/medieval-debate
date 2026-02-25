/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cinzel'", "serif"],
        body: ["'Crimson Text'", "serif"],
        mono: ["'Courier Prime'", "monospace"],
      },
      colors: {
        // Colores modernos de Paginaweb-main
        secondary: "#00ff9f",
        darkBg: "#1a2c2a",
        accent: "#ff1493",
        accentBlue: "#00d4ff",

        // Colores medievales originales
        parchment: {
          50: "#fdf8f0",
          100: "#f9edd8",
          200: "#f2d9a8",
          300: "#e8c070",
          400: "#d4a843",
          500: "#b8892a",
          600: "#9a6e1f",
          700: "#7a5318",
          800: "#5e3f13",
          900: "#422d0e",
        },
        ink: {
          DEFAULT: "#1a1008",
          light: "#3d2b0f",
          faded: "#6b5432",
        },
        scarlet: {
          DEFAULT: "#8b1a1a",
          light: "#b52020",
          dark: "#5c0f0f",
        },
        sapphire: {
          DEFAULT: "#1a3a6b",
          light: "#2557a7",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e8c547",
          dark: "#9a7815",
        },
      },
      backgroundImage: {
        "parchment-texture": "url('/parchment.svg')",
        "gradient-modern": "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)",
      },
      boxShadow: {
        manuscript: "4px 4px 20px rgba(0,0,0,0.4), inset 0 0 40px rgba(139,90,20,0.15)",
        illuminated: "0 0 30px rgba(201,162,39,0.3), 4px 4px 20px rgba(0,0,0,0.5)",
        rune: "0 2px 8px rgba(0,0,0,0.6)",
        neon: "0 0 20px rgba(0, 255, 159, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in",
        "slide-up": "slideUp 0.8s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 159, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 159, 0.8)" },
        },
      },
    },
  },
  plugins: [],
}
