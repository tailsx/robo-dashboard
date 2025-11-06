import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GroupAddMember } from "./group-add-member";

type DialogAddMemberProps = {
  groupId: string;
};
export function DialogAddMember({ groupId }: DialogAddMemberProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create Settings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          <GroupAddMember groupId={groupId} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
