import { LoadingSwapper } from "@/components/loading-swapper";
import { NotFoundDetail } from "@/components/not-found-detail";
import { PageSection } from "@/components/page-section";
import { AssignRobotButton } from "@/features/groups/assign-robot-to-group-button";
import { RobotDetailProvider, useRobotDetail } from "@/features/providers/robot-details-provider";
import { RobotsDetail } from "@/features/robots/robot-detail";
import { UserSettings } from "@/features/robots/user-settings";
import { UserSettingDialog } from "@/features/robots/user-settings-dialog";
import { useParams } from "react-router";

function RobotsDetailPage() {
  const { robotId } = useParams();
  return (
    <RobotDetailProvider robotId={robotId || ""}>
      <RobotsDetailExist>
        <RobotsDetail />

        <PageSection name="Group Assignment">
          <AssignRobotButton robotId={robotId || ""} />
        </PageSection>
        <PageSection name="User Settings">
          <div className="">
            <UserSettingDialog robotId={robotId || ""} />
            <UserSettings />
          </div>
        </PageSection>
      </RobotsDetailExist>
    </RobotDetailProvider>
  );
}

function RobotsDetailExist({ children }: { children: React.ReactNode }) {
  const { robot, isLoading } = useRobotDetail();

  return (
    <LoadingSwapper isLoading={isLoading}>
      <NotFoundDetail data={robot}>{children}</NotFoundDetail>
    </LoadingSwapper>
  );
}

export { RobotsDetailPage };
