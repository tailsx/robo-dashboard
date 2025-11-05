import { appClient } from "@/lib/app";
import { useEffect, useState } from "react";

function useUserSettings(robotId: string) {
  const [setting, setSetting] = useState<Awaited<ReturnType<typeof appClient.getUserRobotSetting>> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await appClient.getUserRobotSetting(robotId);
      setSetting(res);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { setting, isLoading };
}

type UserSettingsProps = {
  robotId: string;
};
function UserSettings({ robotId }: UserSettingsProps) {
  const { setting, isLoading } = useUserSettings(robotId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(setting)}</div>;
}

export { UserSettings };
