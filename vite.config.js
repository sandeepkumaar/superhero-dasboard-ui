import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig(({ mode }) => {
 /* 
  * loads only VITE_* env variables
  * 2nd arg "env" specfies path where env files are located
 */
  const viteEnv = loadEnv(mode, "env");   
  console.log('viteEnv', viteEnv);
  return {
    base: viteEnv.VITE_BASE_URL || '/',
    plugins: [
      react(),
      splitVendorChunkPlugin(),
    ],
    build: {
      outDir: 'public',
      emptyOutDir: false
    },
    envDir: "env"
  }
}
);


