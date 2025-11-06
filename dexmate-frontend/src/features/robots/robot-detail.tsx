import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRobotDetail } from "../providers/robot-details-provider";

type RobotsDetailProps = {};
function RobotsDetail({}: RobotsDetailProps) {
  const { robot, isLoading } = useRobotDetail();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!robot) {
    return <div>Robot not found</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{robot?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Serial Number: {robot?.serial_number}</p>
          <p>Owner ID: {robot?.ownerId}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export { RobotsDetail };
