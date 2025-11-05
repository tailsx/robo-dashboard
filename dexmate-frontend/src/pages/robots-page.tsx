import { CreateRobotForm } from "@/features/robots/create-robot-form";
import { RobotsList } from "@/features/robots/robots-list";

function RobotsPage() {
  return (
    <div>
      <RobotsList />
      <CreateRobotForm />
    </div>
  );
}

export { RobotsPage };
