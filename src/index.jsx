import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import './index.css'
import App, {loader as appLoader} from './app/index.jsx';
import ErrorPage from './error-page.jsx';


/**
 * Routes
 */
const router = createBrowserRouter(
  [
    {
      path: '/',
      //loader: () => ({message: 'hello world'}),
      loader: appLoader,
      Component: App,
      ErrorBoundary: ErrorPage,
    }
  ]
)



export default function Root() {
  return (
    <RouterProvider router={router} />
  )
};

