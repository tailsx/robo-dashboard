import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGroups } from "./hooks/use-groups";
import { Link } from "react-router";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useGroupsRoles } from "./hooks/use-groups-roles";

type GroupTableProps = {
  data: ReturnType<typeof useGroups>["groups"];
};
function GroupTable({ data }: GroupTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          //@ts-expect-error
          data.map(({ id, name, role }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="font-medium">{role}</TableCell>
              <TableCell className="text-right">
                <Link to={`/groups/${id}`}>
                  <Button className="cursor-pointer" variant="ghost">
                    <EyeIcon />
                  </Button>
                </Link>
                <Button className="cursor-pointer" variant="ghost" data-button-action="delete">
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

function GroupTableFull() {
  const { isLoading, groups } = useGroupsRoles();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <GroupTable data={groups} />;
}

export { GroupTableFull as GroupTable };
