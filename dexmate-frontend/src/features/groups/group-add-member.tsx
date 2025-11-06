import { GroupAddMemberForm } from "./group-add-member-form";

type GroupAddMemberProps = {
  groupId: string;
};

export function GroupAddMember({ groupId }: GroupAddMemberProps) {
  return (
    <div>
      <GroupAddMemberForm />
    </div>
  );
}
