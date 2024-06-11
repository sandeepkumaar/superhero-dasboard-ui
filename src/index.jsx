import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import "./root.css";
import "./index.css";
import App from "./app.jsx";
import Dashboard, { loader as dashboardLoader } from "./dashboard/index.jsx";
import DashboardCharts, { loader as chartLoader } from "./dashboard/charts.jsx";
import SuperHeroTable, {
  loader as superHeroLoader,
  action as superHeroAction,
} from "./superhero-table/index.jsx";
import SuperHero from "./superhero-table/super-hero.jsx";
import ErrorPage from "./error-page.jsx";

function Sample() {
  return <h4>Not Found</h4>;
}

/**
 * Routes
 */
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard/charts" replace />,
      },
      {
        path: "dashboard",
        loader: dashboardLoader,
        Component: Dashboard,
        ErrorBoundary: ErrorPage,
        shouldRevalidate: function ({ currentUrl }) {
          return false;
        },
        children: [
          {
            index: true,
            element: <Navigate to="charts" replace />,
          },
          {
            path: "charts",
            loader: chartLoader,
            Component: DashboardCharts,
            ErrorBoundary: ErrorPage,
          },
        ],
      },
      {
        path: "superhero-table",
        loader: superHeroLoader,
        //action: superHeroAction,
        Component: SuperHeroTable,
        ErrorBoundary: ErrorPage,
      },
      {
        path: "/superhero/:id",
        Component: SuperHero,
        ErrorBoundary: ErrorPage,
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
