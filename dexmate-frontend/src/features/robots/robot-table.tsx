import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import type { RobotDetail } from "@/lib/app";
import { use } from "react";
import { useRobots } from "./hooks/use-robots";
import { Button } from "@/components/ui/button";

type RobotTableProps = {
  data: RobotDetail[];
};
function RobotTable({ data }: RobotTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data &&
          data.map(({ id, name, groupId }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{groupId}</TableCell>
              <TableCell className="text-right">
                <Button>View</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

function RobotTableFull() {
  const { robots, isLoading } = useRobots();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RobotTable data={robots} />;
}

export { RobotTableFull as RobotTable };
