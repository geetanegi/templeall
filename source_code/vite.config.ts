import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
 
// https://vitejs.dev/config/
// vite.config.js
export default defineConfig({
  base: '/',  // Replace with your desired base path
  plugins: [react()],
  server: {
    port: 8080, // Replace 3001 with your desired port
  },
  define: {
    global: {},
},
});