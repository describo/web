import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    base: process.env.NODE_ENV === "development" ? "/" : "/web",
    plugins: [vue()],
    optimizeDeps: {
        include: ["element-plus", "@describo/crate-builder-component", "ajv", "dayjs"],
    },
    build: {
        outDir: "docs",
    },
});
