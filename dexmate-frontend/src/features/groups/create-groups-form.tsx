import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const createGroupFormSchema = z.object({
  name: z.string().min(1),
});
type CreateGroupFormSchema = z.infer<typeof createGroupFormSchema>;

function CreateGroupsForm() {
  const form = useForm<CreateGroupFormSchema>({
    resolver: zodResolver(createGroupFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleSubmit(data: CreateGroupFormSchema) {
    console.log("Sign Up Data:", data);
    const res = await authClient.organization.create(
      {
        name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      },
      {
        onError: (error) => {
          toast.error("Failed to create group. Please try again.");
        },
        onSuccess: (data) => {
          console.log("Organization created:", data);
        },
      }
    );
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
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

export { CreateGroupsForm };
