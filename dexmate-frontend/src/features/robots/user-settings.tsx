import { useRobotDetail } from "../providers/robot-details-provider";
import { LoadingSwapper } from "@/components/loading-swapper";

function UserSettings() {
  const { settings, isLoading } = useRobotDetail();

  return (
    <LoadingSwapper isLoading={isLoading}>
      <div>{JSON.stringify(settings)}</div>
    </LoadingSwapper>
  );
}

export { UserSettings };
