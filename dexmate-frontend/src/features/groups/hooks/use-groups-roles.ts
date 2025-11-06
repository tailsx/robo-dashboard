import { appClient } from "@/lib/app";
import { useEffect, useState } from "react";

export function useGroupsRoles() {
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await appClient.getGroupsWithRole();

        setGroups(response);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return { groups, isLoading };
}
