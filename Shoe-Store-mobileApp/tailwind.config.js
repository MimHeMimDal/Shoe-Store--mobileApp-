/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.js",
    "./main.js",
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    // fontFamily: {
    //   MyFont: ["Inter", "serif"],
    // },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        main: "url('./src/assets/Landing/main.png')",
        wall_1: "url('./src/assets/Landing/wall_1.png')",
        wall_2: "url('./src/assets/Landing/wall_2.png')",
        wall_3: "url('./src/assets/Landing/wall_3.png')",
      },
      screens: {
        xs: "360px",
        s: "400px",
      },
    },
  },
  // plugins: [require("flowbite/plugin")],

  // other settings
  "tailwindCSS.includeLanguages": {
    javascript: "javascript",
    html: "HTML",
  },
  "editor.quickSuggestions": {
    strings: true,
  },
};
