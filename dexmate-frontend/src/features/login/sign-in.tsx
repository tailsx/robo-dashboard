import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { SectionHeading } from "@/components/typography";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type SignInFormSchema = z.infer<typeof signInSchema>;

function SignInForm() {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function handleSignUp(data: SignInFormSchema) {
    console.log("Sign Up Data:", data);
    await authClient.signIn.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onError: (error) => {
          toast.error(error.error.message || "Failed to sign up");
        },
        onSuccess: () => {
          navigate("/");
        },
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <SectionHeading>Welcome Back</SectionHeading>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <LoadingSwapper isLoading={isSubmitting}>Sign In</LoadingSwapper>
        </Button>
      </form>
    </Form>
  );
}

function SignInCard() {
  return (
    <Card>
      <CardContent>
        <SignInForm />
      </CardContent>
    </Card>
  );
}

export { SignInCard };
