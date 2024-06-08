/*msw should be imported before others to take effect before loader calls*/

async function enableMocking() {
  // enable only on devServer mode
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/index.js')

    // `worker.start()` returns a Promise that resolves
    return worker.start({onUnhandledRequest: 'bypass'});
    //https://github.com/mswjs/msw/discussions/1636#discussioncomment-6151200

  }
};

import { createRoot } from 'react-dom/client';
const container = document.getElementById('react-root')
const root = createRoot(container);

enableMocking().then(async () => {
  console.log('Render App')
  let App = await import('./src/index.jsx');
  App = App.default;
  root.render(<App />);
})

/**
 * env vs mode
 * https://vitejs.dev/guide/env-and-mode.html#modes
 * Use only mode. process.env.NODE_ENV is simulated in browser and its not reliable.
 * So for getting different builds and load .envs for different behaviours use --mode 
 * $ vite --mode local // uses .env.local in serve
 * $ vite build --mode staging // uses env.staging in build
 * $ vite build // uses env.production in build
*/

console.log('mode', import.meta.env.MODE);
/* Dont use NODE_ENV within code - its confusing in vite */
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('VITE_SERVICE_HOST',import.meta.env.VITE_SERVICE_HOST); 
