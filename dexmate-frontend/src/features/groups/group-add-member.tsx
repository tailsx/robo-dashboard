import { GroupAddMemberForm } from "./group-add-member-form";

type GroupAddMemberProps = {
  groupId: string;
};

export function GroupAddMember({ groupId }: GroupAddMemberProps) {
  return (
    <div>
      Group Add Member Component
      <p>Group ID: {groupId}</p>
      <GroupAddMemberForm groupId={groupId} />
    </div>
  );
}
