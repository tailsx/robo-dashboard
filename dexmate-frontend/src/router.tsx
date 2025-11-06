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
import { AuthenticatedRoute } from "./features/login/authenticate";
import { GroupsDetailPage } from "./pages/group-detail-page";
import { RobotCreatePage } from "./pages/robot-create-page";
import { GroupCreatePage } from "./pages/group-create-page";

export const routes: RouteObject[] = [
  {
    path: "/login",

    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AuthenticatedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "robots",
            element: <RobotsPage />,
          },
          {
            path: "robots/create",
            element: <RobotCreatePage />,
          },

          {
            path: "robots/:robotId",
            element: <RobotsDetailPage />,
            errorElement: <NotFoundPage />,
          },
          {
            path: "groups",
            element: <GroupsPage />,
          },
          {
            path: "groups/create",
            element: <GroupCreatePage />,
          },
          {
            path: "groups/:groupId",
            element: <GroupsDetailPage />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
