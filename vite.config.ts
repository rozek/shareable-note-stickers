import { defineConfig } from 'vite'
import dts  from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  build: {  	
  	lib: {
  		entry:   path.resolve(__dirname, 'src/shareable-note-stickers.ts'),
  		name:    'shareable-note-stickers',
  		formats: ['es']
  	},
  	minify: false,
  	rollupOptions: {
  		external: ['javascript-interface-library','htm','preact','nanoid','nanoid-dictionary'],
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
  plugins: [
    dts({ insertTypesEntry: true }),
  ],
})