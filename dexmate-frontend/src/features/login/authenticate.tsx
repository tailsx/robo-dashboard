// src/components/protected-route.tsx
import { authClient } from "@/lib/auth-client";
import { Navigate, Outlet } from "react-router";

export function AuthenticatedRoute() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
