import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignUpCard } from "./sign-up";
import { SignInCard } from "./sign-in";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authClient } from "@/lib/auth-client";

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
      <Card>Login Component</Card>;
      <TabsContent value="signin">
        <SignInCard />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpCard />
      </TabsContent>
    </Tabs>
  );
}
