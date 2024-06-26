import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      border: "hsl(var(--border))",
      myBorder: "var(--border-clr)",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      black: "var(--black)",
      primary: {
        DEFAULT: "#00a884",
        foreground: "hsl(var(--primary-foreground))",
      },
      "primary-200": "#005c4b",
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      danger: "#f15c6d",
      white: {
        // 50: "var(--white-50)",
        // 100: "var(--white-100)",
        // 200: "var(--white-200)",
        50: "#ffffff1a",
        70: "#ffffff99",
        100: "#e9edef",
        200: "#d1d7db",
      },
      grey: {
        // 100: "var(--grey-100)",
        // 200: "var(--grey-200)",
        // 300: "var(--grey-300)",
        // 400: "var(--grey-400)",
        // 500: "var(--grey-500)",
        // 600: "var(--grey-600)",
        100: "#8696a0",
        200: "#2a3942",
        300: "#202c33",
        400: "#222e35",
        500: "#101a20",
        600: "#111b21",
        700: "#182229",
      },
      green: "#25d366",
    },
    fontSize: {
      sm: "11px",
      "2sm": "12px",
      "2.5sm": "12.5px",
      "3sm": "14px",
      "4sm": "14.2px",
      "5sm": "14.5px",
      md: "15px",
      "2md": "16px",
      "3md": "17px",
      "4md": "18px",
      "5md": "19px",
      lg: "24px",
      "2lg": "36px",
      xl: "80px",
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "chat-bg": "url('/chat_bg.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
      boxShadow: {
        input: "0 2px 0 #ffffff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
