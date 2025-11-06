import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { RobotDetail } from "@/lib/app";
import { authClient } from "@/lib/auth-client";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

type RobotCardProps = {
  robot: RobotDetail;
};
export function RobotCard({ robot }: RobotCardProps) {
  const { data: session } = authClient.useSession();

  return (
    <Card className="min-w-[200px]">
      <CardHeader>
        <h3 className="text-lg font-medium">{robot.name}</h3>
      </CardHeader>
      <CardContent>
        <div>
          {session?.user?.id === robot.ownerId && <Badge variant="secondary">Owner</Badge>}
          {robot.groupId && <Badge variant="default">Shared</Badge>}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <CardAction>
          <Link to={`/robots/${robot.id}`} >
            <ArrowRightIcon width={28} height={28} />
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
