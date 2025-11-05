import { CreateRobotForm } from "@/features/robots/create-robot-form";
import { RobotTable } from "@/features/robots/robot-table";
import { RobotsList } from "@/features/robots/robots-list";

function RobotsPage() {
  return (
    <div>
      <RobotsList />
      <CreateRobotForm />
      <RobotTable />
    </div>
  );
}

export { RobotsPage };
