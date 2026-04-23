import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: /^~/, replacement: '' }
    ],
    // some components might omit .vue extension
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    port: 8082,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:7012',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/api/, '/api')
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    assetsDir: 'static',
    sourcemap: false,
  },
});
