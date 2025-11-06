import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RoleDropdown } from "./role-dropdown";
import { useGroupMembers } from "./providers/group-member-provider";

type GroupMembersTableProps = {
  data: any[];
  onRemoveMember?: (memberId: string) => void;
};
function GroupMembersTable({ data }: GroupMembersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map(({ id, name, role }) => (
            <TableRow key={id} data-row-id={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="font-medium">
                <RoleDropdown defaultValue={role} />
              </TableCell>
              <TableCell className="text-right">
                <Button data-button-action="remove">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

type GroupTableFullProps = {};
export function GroupTableFull({}: GroupTableFullProps) {
  const { isLoading, members, deleteMember } = useGroupMembers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const robotRow = target.closest("tr[data-row-id]");
    const action = target.getAttribute("data-button-action");

    if (robotRow && action === "remove") {
      console.log("few");
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
