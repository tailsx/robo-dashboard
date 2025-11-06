import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

type GroupCardProps = {
  group: any;
};
export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="min-w-[200px]">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardFooter className="justify-end">
        <CardAction>
          <Link to={`/groups/${group.id}`}>
            <ArrowRightIcon height={28} width={28} />
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
