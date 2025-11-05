import { authClient } from "@/lib/auth-client";

function GroupsList() {
  const { data: groups, isPending } = authClient.useListOrganizations();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!groups || groups.length === 0) {
    return <div>No groups found.</div>;
  }

  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
}
export { GroupsList };
