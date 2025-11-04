import { RootLayout } from "@/layouts/root-layout";
import { LoginPage } from "@/pages/login-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <div>Main</div>,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
