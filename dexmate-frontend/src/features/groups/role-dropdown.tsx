import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const GROUP_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  OWNER: "owner",
};

type RoleDropdownProps = {
  defaultValue: string;
};
export function RoleDropdown({ defaultValue }: RoleDropdownProps) {
  if (defaultValue === GROUP_ROLES.OWNER) {
    return <div className="w-[150px] text-black">Owner</div>;
  }
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={GROUP_ROLES.ADMIN}>Admin</SelectItem>
        <SelectItem value={GROUP_ROLES.MEMBER}>Member</SelectItem>
      </SelectContent>
    </Select>
  );
}
