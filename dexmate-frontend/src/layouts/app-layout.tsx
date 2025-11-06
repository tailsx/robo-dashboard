import { NavSidebar } from "@/components/nav-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen w-full">
      <aside className="bg-gray-100 overflow-y-auto border-r">
        <NavSidebar />
      </aside>
      <main className="p-4 overflow-auto">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
}

export { AppLayout };
