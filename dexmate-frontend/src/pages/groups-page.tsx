import { CreateGroupsForm } from "@/features/groups/create-groups-form";
import { GroupTable } from "@/features/groups/group-table";

function GroupsPage() {
  return (
    <div>
      <CreateGroupsForm />
      <GroupTable />
    </div>
  );
}

export { GroupsPage };
