import { LoadingSwapper } from "@/components/loading-swapper";
import { PageHeading, SectionHeading } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { GroupCard } from "@/features/groups/group-card";
import { useGroups } from "@/features/groups/hooks/use-groups";
import { RobotsProvider, useRobots } from "@/features/providers/robots-provider";
import { RobotCard } from "@/features/robots/robot-card";
import { authClient } from "@/lib/auth-client";
import type React from "react";
import { Link } from "react-router";

function HomePage() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <LoadingSwapper isLoading={isPending}>
      <RobotsProvider config={{ limit: 5 }}>
        <PageHeading>Welcome Back, {session?.user?.name}</PageHeading>
        <HomePageContent />
      </RobotsProvider>
    </LoadingSwapper>
  );
}

function HomePageContent() {
  const { isLoading: isGroupLoading, groups } = useGroups();
  const { isLoading: isRobotLoading, robots } = useRobots();

  return (
    <LoadingSwapper isLoading={isGroupLoading || isRobotLoading}>
      <HomePageSection name="Robots" path="/robots">
        {robots?.length > 0 ? robots?.map((robot) => <RobotCard key={robot.id} robot={robot} />) : <div>No robots found.</div>}
      </HomePageSection>
      <HomePageSection name="Groups" path="/groups">
        {groups && groups?.length > 0 ? groups?.map((group) => <GroupCard key={group.id} group={group} />) : <div>No groups found.</div>}
      </HomePageSection>
    </LoadingSwapper>
  );
}

type HomePageSectionProps = {
  name: string;
  path: string;
  children: React.ReactNode;
};
function HomePageSection({ name, path, children }: HomePageSectionProps) {
  return (
    <div className="w-full p-4">
      <div className="flex justify-between ">
        <SectionHeading>My {name}</SectionHeading>
        <Link to={path}>
          <Button variant="default" type="button">
            More {name}
          </Button>
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-4">{children}</div>
    </div>
  );
}

export { HomePage };
