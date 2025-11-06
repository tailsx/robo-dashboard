import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { appClient } from "@/lib/app";
import { use } from "react";
import { useGroupMembership } from "./hooks/use-group-membership";

const groupAddMemberFormSchema = z.object({
  email: z.email(),
});
type GroupAddMemberSchema = z.infer<typeof groupAddMemberFormSchema>;

type GroupAddMemberFormProps = {
  groupId: string;
};
export function GroupAddMemberForm({ groupId }: GroupAddMemberFormProps) {
  const form = useForm<GroupAddMemberSchema>({
    resolver: zodResolver(groupAddMemberFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const { addMember } = useGroupMembership(groupId);

  async function handleSubmit(data: GroupAddMemberSchema) {
    console.log("Sign Up Data:", data);

    const result = await addMember(data.email);

    toast.success("Member added successfully.");
    console.log("Add member result:", result);
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
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
        <div>
          <Button type="submit">
            <LoadingSwapper isLoading={isSubmitting}>Create Robot</LoadingSwapper>
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
