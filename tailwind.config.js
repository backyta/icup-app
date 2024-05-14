/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
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
  
        "pastor-color": "#1976D2",
        "copastor-color": "#9C27B0",
        "leader-color": "#068ef1",
        "family-house-color": "#FFA000",
        "offering-color": "#FFD700",
        "user-color": "#2aa0cd",
        "disciple-color": "#4CAF50",
        "search-color": "#e6c200",
        'vulcan': {
          '50': '#f4f6fb',
          '100': '#e8ecf6',
          '200': '#ccd7eb',
          '300': '#9fb5da',
          '400': '#6b8dc5',
          '500': '#486faf',
          '600': '#365793',
          '700': '#2d4677',
          '800': '#283d64',
          '900': '#263554',
          '950': '#0e131f',
      },
      'mirage': {
        '50': '#f4f6fb',
        '100': '#e8ecf6',
        '200': '#cbd8ec',
        '300': '#9db6dc',
        '400': '#6990c7',
        '500': '#4672b1',
        '600': '#345995',
        '700': '#2b4779',
        '800': '#273e65',
        '900': '#253555',
        '950': '#111827',
    },
    },
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
      fadeIn: 'fadeIn 1s ease-in-out',
    },
    fontFamily: {
      'archivo': ['Archivo', 'sans-serif'],
      'cormorant-garamond': ['Cormorant Garamond', 'serif'],
      'dancing-script': ['Dancing Script', 'cursive'],
      'satisfy': ['Satisfy', 'cursive'],
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
  }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")]
}