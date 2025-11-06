import { RobotsProvider } from "@/features/providers/robots-provider";
import { CreateRobotForm } from "@/features/robots/create-robot-form";
import { RobotTable } from "@/features/robots/robot-table";

function RobotsPage() {
  return (
    <RobotsProvider>
      <div>
        <CreateRobotForm />
        <RobotTable />
      </div>
    </RobotsProvider>
  );
}

export { RobotsPage };
