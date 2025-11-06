import { useMemo } from "react";
import { useGroupRoles } from "./providers/group-roles-provider";

type Permission = "create" | "read" | "update" | "delete" | "manage_members";

function useRoleGuard() {
  const { groups, isLoading, groupId } = useGroupRoles();
  const permissions = useMemo(() => {
    const group = groups.find((g) => g.id === groupId);

    const role = group?.role;

    if (role === "owner") {
      return new Set(["create", "delete", "read", "manage_members", "update"]);
    }

    if (role === "admin") {
      return new Set(["create", "read", "manage_members", "update"]);
    }

    if (role === "member") {
      return new Set(["read"]);
    }

    return new Set();
  }, [groups, groupId]);

  const hasPermission = (permission: Permission): boolean => {
    return permissions.has(permission);
  };

  const hasAnyPermission = (...perms: Permission[]): boolean => {
    return perms.some((p) => permissions.has(p));
  };

  const hasAllPermissions = (...perms: Permission[]): boolean => {
    return perms.every((p) => permissions.has(p));
  };

  const isRole = (role: string): boolean => {
    const group = groups.find((g) => g.id === groupId);
    return group?.role === role;
  };

  return { isRole, isLoading, hasPermission, hasAnyPermission, hasAllPermissions };
}

type RoleGuardProps = {
  role?: "admin" | "member" | "owner";
  permission?: Permission | Permission[];
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};
export function RoleGuard({ role, children, permission, fallback }: RoleGuardProps) {
  const { isRole, hasAnyPermission } = useRoleGuard();
  if (role) {
    const roles = Array.isArray(role) ? role : [role];
    const hasRole = roles.some((r) => isRole(r));
    if (!hasRole) {
      return <>{fallback}</>;
    }
  }

  if (permission) {
    const permissions = Array.isArray(permission) ? permission : [permission];
    const hasAccess = hasAnyPermission(...permissions);
    if (!hasAccess) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}
