
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--radius": "0.5rem",
      },
      ".dark": {
        "--radius": "0.5rem",
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  }
);
