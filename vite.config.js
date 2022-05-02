import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
  publicPath: process.env.NODE_ENV == 'production' ? '/natal-chart/' : '/',
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src')
    },
  },
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ]
})
