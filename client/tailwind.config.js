/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add any other content sources
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0,0,0,0.10)",
        },
        ".card": {
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  // Add this to enable RTL support
  corePlugins: {
    preflight: false,
  },
  // Add this to create RTL variants
  variants: {
    extend: {
      margin: ["rtl"],
      padding: ["rtl"],
      textAlign: ["rtl"],
      float: ["rtl"],
      inset: ["rtl"],
    },
  },
};
