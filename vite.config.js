import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
 
const pageData = {
  '/index.html': {
    title: 'トップページ',
  },
  '/contact.html': {
    title: 'お問い合わせ',
  },
};
 
export default defineConfig({
  root: './src',
  base: '',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, './src/index.html'),
        contact: resolve(__dirname, './src/contact.html'),
      },
      output: {
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(jpe?g|png|gif|svg)$/.test(name ?? '')) {
            return 'assets/img/[name].[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ]
});
