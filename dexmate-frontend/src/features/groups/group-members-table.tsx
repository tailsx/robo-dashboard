import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { appClient } from "@/lib/app";
import { RoleDropdown } from "./role-dropdown";
import { useGroupMembership } from "./hooks/use-group-membership";
import { toast } from "sonner";

type GroupMembersTableProps = {
  data: any;
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
            <TableRow key={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="font-medium">
                <RoleDropdown defaultValue={role} />
              </TableCell>
              <TableCell className="text-right">
                <Button data-remove-member={id}>Remove</Button>
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
        console.log(data);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching group members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const removeMember = (memberId: string) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
  };

  return { members, isLoading, removeMember };
}

type GroupTableFullProps = {
  groupId: string;
};
export function GroupTableFull({ groupId }: GroupTableFullProps) {
  const { isLoading, members, removeMember: removeGroupMember } = useGroupMembers(groupId);
  const { removeMember } = useGroupMembership(groupId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRemoveMember = async (memberId: string) => {
    await removeMember(memberId);
    await removeGroupMember(memberId);
  };
  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const button = target.closest("button[data-remove-member]");
    if (button) {
      console.log("Remove member clicked");
      const memberId = button.getAttribute("data-remove-member");
      if (memberId) {
        await removeMember(memberId);

        toast.success("Member removed successfully");
      }
    }
  };

  return (
    <div onClick={handleClick}>
      <GroupMembersTable data={members} onRemoveMember={handleRemoveMember} />
    </div>
  );
}
