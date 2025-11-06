import { useRobotDetail } from "../providers/robot-details-provider";
import { LoadingSwapper } from "@/components/loading-swapper";

function UserSettings() {
  const { settings, isLoading } = useRobotDetail();

  return (
    <LoadingSwapper isLoading={isLoading}>
      <pre>{JSON.stringify(settings?.json, null, 2)}</pre>
    </LoadingSwapper>
  );
}

export { UserSettings };
