import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appClient } from "@/lib/app";
import type { RobotDetail } from "@/lib/app";
import { useEffect, useState } from "react";

function useRobotDetail(robotId: string) {
  const [robot, setRobot] = useState<RobotDetail | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRobot = async () => {
      setIsFetching(true);
      const res = await appClient.getRobot(robotId);
      setRobot(res);
      console.log(res);
      setIsFetching(false);
    };

    fetchRobot();
  }, [robotId]);

  return {
    robot,
    isLoading: isFetching,
  };
}

function useUserRobotSetting(robotId: string) {
  const [setting, setSetting] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSetting = async () => {
      setIsLoading(true);
      try {
        const res = await appClient.getUserRobotSetting(robotId);
        setSetting(res);
      } catch (error) {
        setSetting(null);
        console.error("Failed to fetch user robot setting:", error);
      }
      setIsLoading(false);
    };

    fetchSetting();
  }, [robotId]);

  return { setting, isLoading };
}
type RobotsDetailProps = {
  robotId: string;
};

function RobotsDetail({ robotId }: RobotsDetailProps) {
  const { robot, isLoading } = useRobotDetail(robotId);
  const { setting, isLoading: isSettingsLoading } = useUserRobotSetting(robotId);

  if (isLoading || isSettingsLoading) {
    return <div>Loading...</div>;
  }

  if (!robot) {
    return <div>Robot not found</div>;
  }

  return (
    <div>
      Robots Detail Page: {robotId}
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
