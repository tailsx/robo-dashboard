import { Button } from "@/components/ui/button";
import { GroupDropdown } from "./group-dropdown";
import { appClient } from "@/lib/app";
import { toast } from "sonner";

type AssignRobotButtonProps = {
  robotId: string;
};
function AssignRobotButton({ robotId }: AssignRobotButtonProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Assigning robot", robotId);
    console.log(e.currentTarget);
    const selectElement = e.currentTarget.querySelector("select") as HTMLSelectElement;
    const selectedGroupId = selectElement.value;
    console.log("to group", selectedGroupId);

    const res = await appClient.assignRobotToGroup(robotId, selectedGroupId);
    console.log("Response:", res);

    toast.success("Robot assigned to group successfully");
  };
  return (
    <form onSubmit={handleSubmit}>
      <GroupDropdown />
      <Button>Assign</Button>
    </form>
  );
}

export { AssignRobotButton };
