module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary:     "#00C2CB",
        primaryDark: "#1DB1B7",
        secondary:   "#44D7DD",
        accent:      "#A6F3FF",
        background:  "#1E1E1E",
        card:        "#446266",
        muted:       "#8A9A9D",
      }
    }
  },
  plugins: [],
};