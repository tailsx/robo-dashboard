import { PageHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { RobotsProvider } from "@/features/providers/robots-provider";
import { RobotTable } from "@/features/robots/robot-table";
import { PlusCircleIcon } from "lucide-react";
import { Link } from "react-router";

function RobotsPage() {
  return (
    <div>
      <PageHeading>Your Robots</PageHeading>
      <RobotsProvider>
        <div>
          <div className="flex justify-end my-2">
            <Link className="" to="/robots/create">
              <Button>
                <PlusCircleIcon />
                Create Robot
              </Button>
            </Link>
          </div>
          <RobotTable />
        </div>
      </RobotsProvider>
    </div>
  );
}

export { RobotsPage };
