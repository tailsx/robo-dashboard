import { appClient, type GroupMember } from "@/lib/app";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

interface GroupMembersContextValue {
  isLoading: boolean;
  addMember: (email: string) => Promise<void>;
  deleteMember: (memberId: string) => Promise<void>;
  members: GroupMember[];
}

const GroupMemberContext = createContext<GroupMembersContextValue | undefined>(undefined);

interface GroupMemberProviderProps {
  children: ReactNode;
  groupId: string;
}

function GroupMemberProvider({ groupId, children }: GroupMemberProviderProps) {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await appClient.getGroupMembers(groupId);
        setMembers(res);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMembers();
  }, []);

  const addMember = async (email: string) => {
    try {
      console.log("Adding member:", email, groupId);
      const member = await appClient.addUserToGroup(email, groupId);
      console.log(members);
      console.log("Added member:", member);
      setMembers((prevMembers) => [...prevMembers, member]);
      toast.success("Member added successfully");

    } catch (error) {
      toast.error("Failed to add member");
    }
  };

  const deleteMember = async (memberId: string) => {
    console.log("Deleting member", memberId);
    try {
      await appClient.removeUserFromGroup(memberId, groupId);

      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
      toast.success("Member deleted successfully");
    } catch (error) {
      toast.error("Failed to delete member");
    }
  };

  return <GroupMemberContext.Provider value={{ members, isLoading, deleteMember, addMember }}>{children}</GroupMemberContext.Provider>;
}

function useGroupMembers() {
  const context = useContext(GroupMemberContext);
  if (!context) {
    throw new Error("useRobots must be used within RobotsProvider");
  }
  return context;
}

export { GroupMemberProvider, useGroupMembers };
