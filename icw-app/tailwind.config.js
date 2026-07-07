/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FDF6F3",
          100: "#FBEAE3",
          200: "#F5D3C6",
          300: "#EDB6A0",
          400: "#E39A7C",
          500: "#D97757",
          600: "#C15F42",
          700: "#9E4A34",
        },
        rose: {
          50: "#FDF2F5",
          100: "#FBE4EA",
          200: "#F4C4D2",
          300: "#E993AB",
          400: "#DB6A8B",
          500: "#C24B71",
          600: "#9C3859",
        },
        plum: {
          50: "#F7F3F6",
          100: "#EADFE7",
          200: "#C9AEC1",
          300: "#A5799D",
          400: "#7C4E75",
          500: "#5B3455",
          600: "#3D2039",
          700: "#291526",
          800: "#1A0D18",
        },
        cream: "#FFFBF8",
        gold: "#C9A15C",
        ink: "#241B24",
      },
      fontFamily: {
        display: ["PlayfairDisplay_600SemiBold"],
        "display-bold": ["PlayfairDisplay_700Bold"],
        "display-italic": ["PlayfairDisplay_500Medium_Italic"],
        sans: ["Manrope_400Regular"],
        "sans-medium": ["Manrope_500Medium"],
        "sans-semibold": ["Manrope_600SemiBold"],
        "sans-bold": ["Manrope_700Bold"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
