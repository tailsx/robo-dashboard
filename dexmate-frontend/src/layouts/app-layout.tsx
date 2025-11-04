import { NavSidebar } from "@/components/nav-sidebar";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { Outlet } from "react-router";

function AppLayout() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen w-full">
      <aside className="bg-gray-100 overflow-y-auto border-r">
        <NavSidebar />
      </aside>
      <main className="p-4 overflow-auto">
        <h1>Welcome to the App!</h1>
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
