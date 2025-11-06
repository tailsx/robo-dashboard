import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import type { RobotDetail } from "@/lib/app";
import { Button } from "@/components/ui/button";
import { useRobots } from "@/features/providers/robots-provider";
import { Link } from "react-router";

type RobotTableProps = {
  data: RobotDetail[];
};
function RobotTable({ data }: RobotTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map(({ id, name, groupId }) => (
            <TableRow key={id} data-robot-id={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{groupId}</TableCell>
              <TableCell className="text-right">
                <Link to={`/robots/${id}`}>
                  <Button>View</Button>
                </Link>
                <Button data-robot-action="delete">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

function RobotTableFull() {
  const { robots, isLoading, deleteRobot } = useRobots();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const robotRow = target.closest("tr[data-robot-id]");
    const action = target.getAttribute("data-robot-action");

    if (robotRow && action === "delete") {
      const robotId = robotRow.getAttribute("data-robot-id");
      if (robotId) {
        await deleteRobot(robotId);
      }
    }
  };

  return (
    <div onClick={handleClick}>
      <RobotTable data={robots} />
    </div>
  );
}

export { RobotTableFull as RobotTable };
