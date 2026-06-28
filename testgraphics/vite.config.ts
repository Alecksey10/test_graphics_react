import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  base: "/test_graphics_react/", // эту настройку вы уже используете
  server: {
    host: '0.0.0.0', // <-- Добавьте эту строку
    port: 27777,    // порт можно указать явно, но это необязательно
  },
});

