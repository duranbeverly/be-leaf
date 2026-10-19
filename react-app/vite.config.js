import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Components use JSX inside .js files (from create-react-app days), so esbuild parses .js as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:5000', '/socket.io': { target: 'http://localhost:5000', ws: true } },
  },
  build: { outDir: 'build' },
});
