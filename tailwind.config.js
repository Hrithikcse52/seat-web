module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light_grey: "#f1f2f6",
        purple: "#786fa6",
        purple_dark: "#574b90",
      },
      boxShadow: {
        login:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        regi: "3.4px 3.4px 2.7px rgba(0,0,0,0.022),8.7px 8.7px 6.9px rgba(0, 0, 0, 0.031),17.7px 17.7px 14.2px rgba(0, 0, 0, 0.039), 36.5px 36.5px 29.2px rgba(0,0,0,0.048), 100px 100px 80px rgba(0,0,0,0.07)   ",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
