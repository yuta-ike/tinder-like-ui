const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drag-none": {
          "user-drag": "none",
          "-webkit-user-drag": "none",
          "-moz-user-select": "none",
        },
      })
    }),
  ],
}
