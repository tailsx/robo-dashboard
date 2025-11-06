import { Outlet } from "react-router";

function RootLayout() {
  return (
    <main className="min-h-screen min-w-screen">
      <Outlet />
    </main>
  );
}

export { RootLayout };
