import { CreateGroupsForm } from "@/features/groups/create-groups-form";
import { GroupsList } from "@/features/groups/groups-list";

function GroupsPage() {
  return (
    <div>
      Groups Page
      <GroupsList />
      <CreateGroupsForm />
    </div>
  );
}

export { GroupsPage };
