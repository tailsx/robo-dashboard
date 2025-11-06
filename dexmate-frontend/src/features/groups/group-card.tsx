import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { RobotDetail } from "@/lib/app";
import { authClient } from "@/lib/auth-client";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";
import { useGroups } from "./hooks/use-groups";

type GroupCardProps = {
  group: any;
};
export function GroupCard({ group }: GroupCardProps) {
  const { groups } = useGroups();

  return (
    <Card className="min-w-[200px]">
      <CardHeader>
        <p></p>
      </CardHeader>
      <CardContent>{JSON.stringify(groups)}</CardContent>
      <CardFooter className="justify-end">
        <CardAction>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
