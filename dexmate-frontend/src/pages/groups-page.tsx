import { CreateGroupsForm } from "@/features/groups/create-groups-form";
import { GroupTable } from "@/features/groups/group-table";
import { GroupsList } from "@/features/groups/groups-list";

function GroupsPage() {
  return (
    <div>
      Groups Page
      <GroupsList />
      <CreateGroupsForm />
      <GroupTable />
    </div>
  );
}

export { GroupsPage };
