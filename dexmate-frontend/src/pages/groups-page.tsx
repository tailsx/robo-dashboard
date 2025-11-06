import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { GroupTable } from "@/features/groups/group-table";
import { PlusCircleIcon } from "lucide-react";
import { Link } from "react-router";

function GroupsPage() {
  return (
    <div>
      <PageHeading>Your Groups</PageHeading>
      <div>
        <div className="flex justify-end my-2">
          <Link className="" to="/groups/create">
            <Button>
              <PlusCircleIcon />
              Create Group
            </Button>
          </Link>
        </div>
        <GroupTable />
      </div>
    </div>
  );
}

export { GroupsPage };
