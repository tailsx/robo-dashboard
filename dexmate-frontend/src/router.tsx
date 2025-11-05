import { RootLayout } from "@/layouts/root-layout";
import { LoginPage } from "@/pages/login-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import { HomePage } from "@/pages/home-page";
import { AppLayout } from "./layouts/app-layout";
import { RobotsPage } from "./pages/robots-page";
import { GroupsPage } from "./pages/groups-page";
import { RobotsDetailPage } from "./pages/robots-detail-page";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "robots",
        element: <RobotsPage />,
      },
      {
        path: "robots/:robotId",
        element: <RobotsDetailPage />,
      },
      {
        path: "groups",
        element: <GroupsPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
