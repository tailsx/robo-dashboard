import { usePermissions } from "./hooks/use-permissions";

interface PermissionGuardProps {
  permission?: string | string[];
  role?: string | string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ permission, role, fallback = null, children }: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, isRole } = usePermissions();

  // Check role if specified
  if (role) {
    const roles = Array.isArray(role) ? role : [role];
    const hasRole = roles.some((r) => isRole(r));
    if (!hasRole) return <>{fallback}</>;
  }

  // Check permission if specified
  if (permission) {
    const permissions = Array.isArray(permission) ? permission : [permission];
    const hasAccess = hasAnyPermission(...permissions);
    if (!hasAccess) return <>{fallback}</>;
  }

  return <>{children}</>;
}
