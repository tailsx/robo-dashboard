import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RoleDropdown } from "./role-dropdown";
import { useGroupMembers } from "./providers/group-member-provider";
import { TrashIcon } from "lucide-react";
import { RoleGuard } from "./role-guard";

type GroupMembersTableProps = {
  data: any[];
  onRemoveMember?: (memberId: string) => void;
};
function GroupMembersTable({ data }: GroupMembersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="w-[100px]">Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map(({ id, name, role }) => (
            <TableRow key={id} data-row-id={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="font-medium">
                <RoleGuard permission={["manage_members"]} fallback={<span className="capitalize">{role}</span>}>
                  <RoleDropdown defaultValue={role} />
                </RoleGuard>
              </TableCell>
              <TableCell className="text-right">
                <RoleGuard permission={["delete"]}>
                  <Button variant="ghost" data-button-action="remove">
                    <TrashIcon />
                  </Button>
                </RoleGuard>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

type GroupTableFullProps = {};
export function GroupTableFull({}: GroupTableFullProps) {
  const { isLoading, members, deleteMember, groupRoles } = useGroupMembers();

  console.log("Group roles in table:", groupRoles);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const robotRow = target.closest("tr[data-row-id]");
    const action = target.getAttribute("data-button-action");

    if (robotRow && action === "remove") {
      const rowId = robotRow.getAttribute("data-row-id");

      if (rowId) {
        await deleteMember(rowId);
      }
    }
  };

  return (
    <div onClick={handleClick}>
      <GroupMembersTable data={members} />
    </div>
  );
}
