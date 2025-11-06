import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGroups } from "./hooks/use-groups";

type GroupDropdownProps = {
  defaultValue?: string | null;
};

export function GroupDropdown({ defaultValue }: GroupDropdownProps) {
  const { groups } = useGroups();

  return (
    <Select defaultValue={defaultValue || undefined}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Groups</SelectLabel>
          {groups?.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
