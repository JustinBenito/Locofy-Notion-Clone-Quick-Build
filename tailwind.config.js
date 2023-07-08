/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        whitesmoke: "#f8f8f8",
        black: "#212121",
        darkslategray: {
          "100": "#37352f",
          "200": "rgba(55, 53, 47, 0.5)",
          "300": "rgba(55, 53, 47, 0.65)",
          "400": "rgba(55, 53, 47, 0.09)",
        },
        gainsboro: {
          "100": "#ddd",
          "200": "#dadada",
        },
        silver: "rgba(199, 199, 199, 0.16)",
        "gray-50": "#fafafa",
        seagreen: "#448361",
        steelblue: "#337ea9",
        gray: "#787774",
        dimgray: "#5a5a65",
      },
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "10xs": "3px",
      },
    },
    fontSize: {
      smi: "13px",
      sm: "14px",
      xs: "12px",
    },
    screens: {
      md: {
        max: "960px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
