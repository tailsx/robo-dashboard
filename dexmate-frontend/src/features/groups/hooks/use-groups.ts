import { authClient } from "@/lib/auth-client";

export function useGroups() {
  const { data: groups, isPending } = authClient.useListOrganizations();

  return { groups, isLoading: isPending };
}
