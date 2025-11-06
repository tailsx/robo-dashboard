import { PageHeading } from "@/components/typography";
import { DialogAddMember } from "@/features/groups/dialog-add-member";
import { GroupTableFull } from "@/features/groups/group-members-table";
import { GroupMemberProvider } from "@/features/groups/providers/group-member-provider";
import { GroupRolesProvider } from "@/features/groups/providers/group-roles-provider";
import { useParams } from "react-router";

function GroupsDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();

  return (
    <GroupRolesProvider groupId={groupId!}>
      <GroupMemberProvider groupId={groupId!}>
        <PageHeading>My Groups</PageHeading>
        <div className="flex justify-end">
          <DialogAddMember groupId={groupId!} />
        </div>
        <GroupTableFull />
      </GroupMemberProvider>
    </GroupRolesProvider>
  );
}

export { GroupsDetailPage };
