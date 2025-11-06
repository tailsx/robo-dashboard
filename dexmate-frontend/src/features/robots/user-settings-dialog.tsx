import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserSettingForm } from "./user-settings-form";

type UserSettingDialogProps = {
  robotId: string;
};
export function UserSettingDialog({ robotId }: UserSettingDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create Settings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <CreateUserSettingForm robotId={robotId} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
