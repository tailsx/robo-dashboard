// src/hooks/use-permissions.ts
import { authClient } from "@/lib/auth-client";
import { useMemo } from "react";

type Permission = "create" | "read" | "update" | "delete" | "manage_members";

export function usePermissions() {
  const { data: org } = authClient.useActiveOrganization();

  const permissions = useMemo(() => {
    if (!org?.members?.role) return new Set<Permission>();
    
    // Get permissions from role configuration
    const rolePermissions = org.member.role.permissions || [];
    return new Set<Permission>(rolePermissions);
  }, [org]);

  const hasPermission = (permission: Permission): boolean => {
    return permissions.has(permission);
  };

  const hasAnyPermission = (...perms: Permission[]): boolean => {
    return perms.some(p => permissions.has(p));
  };

  const hasAllPermissions = (...perms: Permission[]): boolean => {
    return perms.every(p => permissions.has(p));
  };

  const isRole = (role: string): boolean => {
    return org?.member?.role?.name === role;
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isRole,
    role: org?.member?.role?.name,
  };
}