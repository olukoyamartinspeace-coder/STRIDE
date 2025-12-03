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
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#0F172A", // Deep Blue
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#D4AF37", // Gold/Accent
                    foreground: "#0F172A",
                },
                muted: {
                    DEFAULT: "#F1F5F9",
                    foreground: "#64748B",
                },
                accent: {
                    DEFAULT: "#38BDF8", // Sky Blue for highlights
                    foreground: "#FFFFFF",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-outfit)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
