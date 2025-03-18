import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    host: '192.168.0.108',
    port: '3000',
  },
  plugins: [tailwindcss()],
});
