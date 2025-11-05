import { Button } from "@/components/ui/button";
import { GroupDropdown } from "./group-dropdown";

type AssignRobotButtonProps = {
  robotId: string;
};
function AssignRobotButton({ robotId }: AssignRobotButtonProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Assigning robot", robotId);
    console.log(e.currentTarget)
    const selectElement = e.currentTarget.querySelector("select") as HTMLSelectElement;
    const selectedGroupId = selectElement.value;
    console.log("to group", selectedGroupId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <GroupDropdown />
      <Button>Assign</Button>
    </form>
  );
}

export { AssignRobotButton };
