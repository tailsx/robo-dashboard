import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGroups } from "./hooks/use-groups";

export function GroupDropdown() {
  const { groups } = useGroups();

  return (
    <Select>
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
