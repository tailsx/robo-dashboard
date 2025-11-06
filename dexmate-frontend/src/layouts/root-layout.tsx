import { Outlet } from "react-router";

function RootLayout() {
  return (
    <main className="min-w-full">
      <Outlet />
    </main>
  );
}

export { RootLayout };
