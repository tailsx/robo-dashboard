import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { appClient } from "@/lib/app";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const createRobotFormSchema = z.object({
  serialNumber: z.string(),
  name: z.string().min(1),
});
type CreateRobotFormSchema = z.infer<typeof createRobotFormSchema>;

function CreateRobotForm() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const form = useForm<CreateRobotFormSchema>({
    resolver: zodResolver(createRobotFormSchema),
    defaultValues: {
      serialNumber: "",
      name: "",
    },
  });

  async function handleSubmit(data: CreateRobotFormSchema) {
    console.log("Sign Up Data:", data);
    const { serialNumber, ...rest } = data;

    try {
      const res = await appClient.createRobot({
        ...rest,
        serial_number: serialNumber,
        ownerId: session?.user?.id || "",
        ownerType: "user",
      });

      if (res.id) {
        navigate("/robots/" + res.id);
      }
    } catch (error) {
      toast.error("Failed to create robot. Please try again.");
    }
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
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
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
        </div>
      </form>
    </Form>
  );
}

export { CreateRobotForm };
