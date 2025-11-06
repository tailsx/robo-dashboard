import { RobotsProvider } from "@/features/providers/data-providers";
import { CreateRobotForm } from "@/features/robots/create-robot-form";
import { RobotTable } from "@/features/robots/robot-table";
import { RobotsList } from "@/features/robots/robots-list";

function RobotsPage() {
  return (
    <RobotsProvider>
      <div>
        <RobotsList />
        <CreateRobotForm />
        <RobotTable />
      </div>
    </RobotsProvider>
  );
}

export { RobotsPage };
