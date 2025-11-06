import { createContext, useContext, type ReactNode } from "react";
import { useGroupsRoles } from "../hooks/use-groups-roles";

interface GroupRolesContextValue {
  isLoading: boolean;
  groups: any[];
  groupId: string;
}

const GroupRolesContext = createContext<GroupRolesContextValue | undefined>(undefined);

interface GroupRolesProviderProps {
  children: ReactNode;
  groupId: string;
}

function GroupRolesProvider({ groupId, children }: GroupRolesProviderProps) {
  const { groups, isLoading } = useGroupsRoles();

  return <GroupRolesContext.Provider value={{ groups, isLoading, groupId }}>{children}</GroupRolesContext.Provider>;
}

function useGroupRoles() {
  const context = useContext(GroupRolesContext);
  if (!context) {
    throw new Error("useRobots must be used within RobotsProvider");
  }
  return context;
}

export { GroupRolesProvider, useGroupRoles };
