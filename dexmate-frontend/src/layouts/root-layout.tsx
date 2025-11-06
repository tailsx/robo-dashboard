import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { RootLayout };
