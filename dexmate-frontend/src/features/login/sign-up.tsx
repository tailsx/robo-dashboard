import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { SectionHeading } from "@/components/typography";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});
type SignUpFormSchema = z.infer<typeof signUpSchema>;

function SignUpForm() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function handleSignUp(data: SignUpFormSchema) {
    console.log("Sign Up Data:", data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <SectionHeading>Create an Account</SectionHeading>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <LoadingSwapper isLoading={isSubmitting}>Sign Up</LoadingSwapper>
        </Button>
      </form>
    </Form>
  );
}

function SignUpCard() {
  return (
    <Card>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}

export { SignUpCard };
