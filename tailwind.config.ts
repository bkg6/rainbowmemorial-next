import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-alt": "var(--color-background-alt)",
        surface: "var(--color-surface)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-primary-hover": "var(--color-accent-primary-hover)",
        "accent-primary-light": "var(--color-accent-primary-light)",
        "accent-secondary": "var(--color-accent-secondary)",
        "accent-secondary-light": "var(--color-accent-secondary-light)",
        "accent-warmth": "var(--color-accent-warmth)",
        "accent-warmth-light": "var(--color-accent-warmth-light)",
        "accent-soft": "var(--color-accent-soft)",
        border: "var(--color-border)",
        "border-focus": "var(--color-border-focus)",
        error: "var(--color-error)",
        "error-light": "var(--color-error-light)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        document: "var(--font-document)",
        handwriting: "var(--font-handwriting)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(80,60,40,0.06)",
        "card-hover": "0 16px 48px rgba(80,60,40,0.16)",
        memorial: "0 12px 40px rgba(80,60,40,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
