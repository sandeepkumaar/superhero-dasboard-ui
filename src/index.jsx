import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import './root.css'
import './index.css'
import App, {loader as appLoader, action as appAction} from './app/index.jsx';
import ErrorPage from './error-page.jsx';


function NotFound() {
  return (
    <h4>Not Found</h4>
  )
}

/**
 * Routes
 */
const router = createBrowserRouter(
  [
    {
      path: '/',
      //loader: () => ({message: 'hello world'}),
      loader: appLoader,
      action: appAction,
      Component: App,
      ErrorBoundary: ErrorPage,
    },
    {
      path: '*',
      Component: NotFound,
    }
  ]
)



export default function Root() {
  return (
    <RouterProvider router={router} />
  )
};

