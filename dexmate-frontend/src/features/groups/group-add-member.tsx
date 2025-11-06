import { GroupAddMemberForm } from "./group-add-member-form";

type GroupAddMemberProps = {
  groupId: string;
};

export function GroupAddMember({  }: GroupAddMemberProps) {
  return (
    <div>
      <GroupAddMemberForm />
    </div>
  );
}
