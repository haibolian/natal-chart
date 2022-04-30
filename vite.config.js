import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

export default defineConfig({
  alias: {
    "@": resolve(__dirname, 'src')
  },
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ]
})
