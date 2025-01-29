/** @type {import('tailwindcss').Config} */
export default {
   // يفعّل الوضع الداكن بناءً على class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        sm: "550px",
        md: "750px",
        lg: "976px",
        xl: "1440px",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
