import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";


export default defineConfig(({ mode }) => {
 /* 
  * loads only VITE_* env variables
  * 2nd arg "env" specfies path where env files are located
 */
  //const env = process.env.NODE_ENV;
  const viteEnv = loadEnv(mode, "env");   
  console.log('viteEnv', viteEnv);
  return {
    //base: viteEnv.VITE_BASE_URL || '/',
    plugins: [
      react(),
      //splitVendorChunkPlugin(),
    ],
    resolve: {
      alias: {
        /* for components */
        "@": path.resolve(__dirname, "./src"),
      },
    },
    envDir: "env",
    base: './',
  }
}
);


