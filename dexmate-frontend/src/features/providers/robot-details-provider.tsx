import { type RobotDetail, appClient } from "@/lib/app";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface RobotDetailContextValue {
  robot: RobotDetail | null;
  settings: Record<string, string>;
  isLoading: boolean;
}

const RobotDetailContext = createContext<RobotDetailContextValue | undefined>(undefined);

interface RobotDetailProviderProps {
  robotId: string;
  children: ReactNode;
}

function RobotDetailProvider({ robotId, children }: RobotDetailProviderProps) {
  const [robot, setRobot] = useState<RobotDetail | null>(null);
  const [isRobotLoading, setIsRobotLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);

  const isLoading = isRobotLoading || isSettingsLoading;

  useEffect(() => {
    async function fetchRobot() {
      try {
        const res = await appClient.getRobot(robotId);
        setRobot(res);
      } finally {
        setIsRobotLoading(false);
      }
    }

    fetchRobot();
  }, []);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await appClient.getUserRobotSetting(robotId);
        setSettings(res);
      } catch (error) {
        setSettings(null);
      } finally {
        setIsSettingsLoading(false);
      }
    }
    fetchSettings();
  }, []);



  return <RobotDetailContext.Provider value={{ robot, settings, isLoading }}>{children}</RobotDetailContext.Provider>;
}

function useRobotDetail() {
  const context = useContext(RobotDetailContext);
  if (!context) {
    throw new Error("useRobotDetail must be used within RobotDetailProvider");
  }
  return context;
}

export { RobotDetailProvider, useRobotDetail };
