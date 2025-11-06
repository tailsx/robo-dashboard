import { appClient } from "@/lib/app";

export function useGroupMembership(groupId: string) {
  const addMember = async (email: string) => {
    await appClient.addUserToGroup(email, groupId);
  };

  const removeMember = async (userId: string) => {
    await appClient.removeUserFromGroup(userId, groupId);
  };

  return { addMember, removeMember };
}
