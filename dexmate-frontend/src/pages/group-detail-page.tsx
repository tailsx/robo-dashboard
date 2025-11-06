import { GroupAddMember } from "@/features/groups/group-add-member";
import { GroupDetails } from "@/features/groups/group-details";
import { GroupTableFull } from "@/features/groups/group-members-table";
import { GroupMemberProvider } from "@/features/groups/providers/group-member-provider";
import { useParams } from "react-router";

function GroupsDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();

  return (
    <GroupMemberProvider groupId={groupId!}>
      <GroupDetails groupId={groupId!} />
      <GroupAddMember groupId={groupId!} />
      <GroupTableFull  />
    </GroupMemberProvider>
  );
}

export { GroupsDetailPage };
