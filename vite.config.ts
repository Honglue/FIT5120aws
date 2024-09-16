import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Alias for the src directory
    },
  },
  build: {
    // Inline asset files larger than 0 bytes (effectively disables inlining)
    assetsInlineLimit: 0,
    
    rollupOptions: {
      output: {
        // Prevent splitting the code into multiple chunks (optional)
        manualChunks: undefined,
      },
    },

    // Disable minification for easier debugging (set to false)
    minify: false,
  },
});
