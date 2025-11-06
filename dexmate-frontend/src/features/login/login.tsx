import { Tabs, TabsList, TabsTrigger as BaseTabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignUpCard } from "./sign-up";
import { SignInCard } from "./sign-in";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authClient } from "@/lib/auth-client";

function TabsTrigger(props: React.ComponentProps<typeof BaseTabsTrigger>) {
  return <BaseTabsTrigger className="flex-1 bg-white! data-[state=active]:bg-secondary! data-[state=inactive]:opacity-20" {...props} />;
}

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    authClient.getSession().then(({ data: session }) => {
      if (session) {
        navigate("/");
      }
    });
  }, []);

  return (
    <Tabs defaultValue="signin">
      <TabsList>
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SignInCard />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpCard />
      </TabsContent>
    </Tabs>
  );
}
