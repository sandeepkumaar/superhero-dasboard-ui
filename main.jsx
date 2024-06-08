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
//import App from './src/index.jsx';
const container = document.getElementById('react-root')
const root = createRoot(container);
//root.render(<App/>);

enableMocking().then(async () => {
  console.log('Render App')
  let App = await import('./src/index.jsx');
  App = App.default;
  root.render(<App />);
})

/**
 * env vs mode
 * https://vitejs.dev/guide/env-and-mode.html#modes
 * $ vite         // mode: developement. runs in dev server with watch/hmr
 * $ vite build   // mode: production. deployable code
 * Purpose of "mode" is to tells us whether we are in devServer or build
 * 
 * "vite build" can combine with NODE_ENV to tell vite to load corresponding .env.* file for variables
 * which is used for build modification and feature flags
 * NODE_ENV=developement vite build - builds code with .env.developement config
 * NODE_ENV=production vite build == vite bulid  (here NODE_ENV is supplied by vite only for this case)
 * use "import.meta.env.MODE|DEV" to identify whether app is running on devServer mode or build Mode
 * use "immport.meta.env.VITE_*" to use it during build mode
*/

console.log('mode', import.meta.env.MODE);
console.log('VITE_SERVICE_HOST',import.meta.env.VITE_SERVICE_HOST); 
