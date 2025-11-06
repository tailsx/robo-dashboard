import { GroupDetails } from "@/features/groups/group-details";
import { useParams } from "react-router";

function GroupsDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();

  return (
    <div>
      <GroupDetails groupId={groupId!} />
    </div>
  );
}

export { GroupsDetailPage };
