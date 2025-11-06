import { Button } from "@/components/ui/button";
import { GroupDropdown } from "./group-dropdown";
import { appClient } from "@/lib/app";
import { toast } from "sonner";
import { useRobotDetail } from "../providers/robot-details-provider";

type AssignRobotButtonProps = {
  robotId: string;
};
function AssignRobotButton({ robotId }: AssignRobotButtonProps) {
  const { robot } = useRobotDetail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectElement = e.currentTarget.querySelector("select") as HTMLSelectElement;
    const selectedGroupId = selectElement.value;

    const res = await appClient.assignRobotToGroup(robotId, selectedGroupId);
    console.log("Response:", res);

    toast.success("Robot assigned to group successfully");
  };
  return (
    <form className="grid grid-cols-2 w-[350px]" onSubmit={handleSubmit}>
      <GroupDropdown defaultValue={robot?.groupId} />
      <Button>Assign</Button>
    </form>
  );
}

export { AssignRobotButton };
