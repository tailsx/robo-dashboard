import { type RobotDetail, appClient } from "@/lib/app";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

interface RobotsContextValue {
  robots: RobotDetail[];
  isLoading: boolean;
  deleteRobot: (robotId: string) => Promise<void>;
}

const RobotsContext = createContext<RobotsContextValue | undefined>(undefined);

interface RobotsProviderProps {
  children: ReactNode;
}

function RobotsProvider({ children }: RobotsProviderProps) {
  const [robots, setRobots] = useState<RobotDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRobots() {
      try {
        const res = await appClient.getRobots();
        setRobots(res);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRobots();
  }, []);

  const deleteRobot = async (robotId: string) => {
    console.log("Deleting robot", robotId);
    try {
      await appClient.deleteRobot(robotId);

      setRobots((prevRobots) => prevRobots.filter((robot) => robot.id !== robotId));
      toast.success("Robot deleted successfully");
    } catch (error) {
      toast.error("Failed to delete robot");
    }
  };

  return <RobotsContext.Provider value={{ robots, isLoading, deleteRobot }}>{children}</RobotsContext.Provider>;
}

function useRobots() {
  const context = useContext(RobotsContext);
  if (!context) {
    throw new Error("useRobots must be used within RobotsProvider");
  }
  return context;
}

export { RobotsProvider, useRobots };
