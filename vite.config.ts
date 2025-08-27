import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget';
  
  if (isWidget) {
    // Widget build uchun
    return {
      plugins: [react(), tailwindcss()],
      build: {
        lib: {
          entry: './src/widget/index.ts',
          name: 'CalculatorWidget',
          fileName: 'calculator-widget',
          formats: ['iife', 'es']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        },
        outDir: 'dist/widget',
        emptyOutDir: true
      }
    };
  }
  
  // Standalone app uchun (default)
  return {
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist/app',
      emptyOutDir: true
    },
    base: '/',
    server: {
      port: 5173
    }
  };
});
