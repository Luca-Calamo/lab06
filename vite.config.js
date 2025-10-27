import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react()],
    // Use a production base for builds (deployed site) but
    // keep root ('/') when running the dev server to avoid
    // Vite's "public base URL" warning when visiting localhost.
    base: command === 'serve' ? '/' : '/lab06/',
}));
