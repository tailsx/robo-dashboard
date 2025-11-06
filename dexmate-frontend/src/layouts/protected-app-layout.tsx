import { authClient } from "@/lib/auth-client";
import { Navigate } from "react-router";
import { AppLayout } from "./app-layout";

function ProtectedAppLayout() {
  const { data: session, isPending } = authClient.useSession();

  // Show loading spinner while checking authentication
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Render the app layout if authenticated
  return <AppLayout />;
}

export { ProtectedAppLayout };
