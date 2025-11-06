import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGroups } from "./hooks/use-groups";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { appClient } from "@/lib/app";

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

function useGroupMembers(groupId: string) {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await appClient.getGroupMembers(groupId);
        console.log(data)
        setMembers(data);
      } catch (error) {
        console.error("Error fetching group members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { members, isLoading };
}

type GroupTableFullProps = {
  groupId: string;
}
export function GroupTableFull({groupId}: GroupTableFullProps) {
  const { isLoading, members } = useGroupMembers(groupId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GroupMembersTable data={members} />
    </>
  );
}
