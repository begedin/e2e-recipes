import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '~/src': path.resolve(__dirname, 'src'),
    },
  },
});
