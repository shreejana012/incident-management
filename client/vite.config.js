import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 8081 } = process.env;

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                //target: `http://localhost:${PORT}`,
                target: `https://incident-management.onrender.com`,
                changeOrigin: true,
            },
            '/auth': {
                //target: `http://localhost:${PORT}`,
                target: `https://incident-management.onrender.com`,
                changeOrigin: true,
            },
        },
    },
/*
    build: {
        manifest: true,
        rollupOptions: {
            input: "./src/main.jsx",
        },
    },
*/    
    build: {
        //outDir: '../dist/app',
        outDir: './dist',
    }
});
