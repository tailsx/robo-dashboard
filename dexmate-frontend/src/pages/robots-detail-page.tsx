import { AssignRobotButton } from "@/features/groups/assign-robot-to-group-button";
import { RobotsDetail } from "@/features/robots/robot-detail";
import { UserSettings } from "@/features/robots/user-settings";
import { CreateUserSettingForm } from "@/features/robots/user-settings-form";
import { useParams } from "react-router";

function RobotsDetailPage() {
  const { robotId } = useParams();
  return (
    <div>
      <RobotsDetail robotId={robotId || ""}></RobotsDetail>

      <AssignRobotButton robotId={robotId || ""} />
      <CreateUserSettingForm robotId={robotId || ""} />
      <UserSettings robotId={robotId || ""} />
    </div>
  );
}

export { RobotsDetailPage };
