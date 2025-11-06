import { GroupAddMember } from "@/features/groups/group-add-member";
import { GroupDetails } from "@/features/groups/group-details";
import { GroupTableFull } from "@/features/groups/group-members-table";
import { useParams } from "react-router";

function GroupsDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();

  return (
    <div>
      <GroupDetails groupId={groupId!} />
      <GroupAddMember groupId={groupId!} />
      <GroupTableFull groupId={groupId!} />
    </div>
  );
}

export { GroupsDetailPage };
