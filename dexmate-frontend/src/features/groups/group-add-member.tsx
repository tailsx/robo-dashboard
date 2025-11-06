import { appClient } from "@/lib/app";
import { GroupAddMemberForm } from "./group-add-member-form";

type GroupAddMemberProps = {
  groupId: string;
};

function useAddGroup(groupId: string) {
  const addMember = async (email: string) => {
    await appClient.addUserToGroup(email, groupId);
  };

  return { addMember };
}

export function GroupAddMember({ groupId }: GroupAddMemberProps) {
  const { addMember } = useAddGroup(groupId!);
  return (
    <div>
      Group Add Member Component
      <p>Group ID: {groupId}</p>

      <GroupAddMemberForm groupId={groupId} />
    </div>
  );
}
