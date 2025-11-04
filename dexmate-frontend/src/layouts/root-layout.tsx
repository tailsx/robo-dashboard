import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div>
      Root Layout
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { RootLayout };
