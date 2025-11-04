import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignUpCard } from "./sign-up";

export function Login() {
  return (
    <Tabs defaultValue="signin">
      <TabsList>
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <Card>Login Component</Card>;
      <TabsContent value="signin">
        <SignIn />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpCard />
      </TabsContent>
    </Tabs>
  );
}

function SignIn() {
  return <Card>Sign In Component</Card>;
}
