import { type RobotDetail, appClient } from "@/lib/app";
import { useState, useEffect } from "react";

function useRobots() {
  const [robots, setRobots] = useState<RobotDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRobots() {
      const res = await appClient.getRobots();
      setRobots(res);
    }
    setIsLoading(false);

    fetchRobots();
  }, []);

  return { robots, isLoading };
}

export { useRobots };