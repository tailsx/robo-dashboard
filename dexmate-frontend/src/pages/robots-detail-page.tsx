import { RobotsDetail } from "@/features/robots/robot-detail";
import { useParams } from "react-router";

function RobotsDetailPage() {
  const { robotId } = useParams();
  return <RobotsDetail robotId={robotId || ""}></RobotsDetail>;
}

export { RobotsDetailPage };
