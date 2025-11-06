import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGroups } from "./hooks/use-groups";
import { Link } from "react-router";
import { GroupAddMember } from "./group-add-member";

type GroupMembersTableProps = {
  data: any;
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
          data.map(({ id, name }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="text-right">
                <Link to={`/groups/${id}`}>
                  <Button>View</Button>
                </Link>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export function GroupTableFull() {
  const { isLoading, groups } = useGroups();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GroupAddMember />
      <GroupMembersTable data={groups} />
    </>
  );
}
