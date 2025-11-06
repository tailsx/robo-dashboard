import { appClient } from "@/lib/app";
import { useEffect, useState } from "react";

type GroupDetailsProps = {
  groupId: string;
};

type GroupDetailFull = Awaited<ReturnType<typeof appClient.getGroupDetail>>;

function useGroupDetails(groupId: string) {
  const [data, setData] = useState<GroupDetailFull | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchGroupDetails() {
      try {
        setIsLoading(true);
        const result = await appClient.getGroupDetail(groupId);
        setData(result);
      } catch (e) {
        console.error("Failed to fetch group details", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGroupDetails();
  }, []);

  return { data, isLoading };
}

function GroupDetails({ groupId }: GroupDetailsProps) {
  const { data, isLoading } = useGroupDetails(groupId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Group Details for {groupId}
      {JSON.stringify(data)}
    </div>
  );
}

export { GroupDetails };
