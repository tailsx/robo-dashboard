import { NavSidebar } from "@/components/nav-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      {/* Mobile Header with Sheet Trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b bg-white z-10 flex items-center px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0">
            <NavSidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Layout */}
      <div className="md:grid md:grid-cols-[250px_1fr] min-h-screen">
        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="hidden md:block bg-gray-100 overflow-y-auto border-r">
          <NavSidebar />
        </aside>

        {/* Main Content */}
        <main className="p-4 overflow-auto mt-14 md:mt-0">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
}

export { AppLayout };