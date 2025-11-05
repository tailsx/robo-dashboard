import z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { appClient } from "@/lib/app";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const createUserSettingSchema = z.object({
  settings: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
});
type CreateUserSettingSchema = z.infer<typeof createUserSettingSchema>;

type CreateUserSettingFormProps = {
  robotId: string;
};
function CreateUserSettingForm({ robotId }: CreateUserSettingFormProps) {
  const form = useForm<CreateUserSettingSchema>({
    resolver: zodResolver(createUserSettingSchema),
    defaultValues: {
      settings: [{ key: "", value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "settings",
  });

  async function handleSubmit(data: CreateUserSettingSchema) {
    console.log("Sign Up Data:", data);
    const { settings } = data;

    const json: Record<string, string> = {};
    for (const setting of settings) {
      json[setting.key] = setting.value;
    }

    try {
      const res = await appClient.createUserRobotSetting(robotId, json);
      console.log(res);
    } catch (error) {
      toast.error("Failed to create user settings");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`settings.${index}.key`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`settings.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="destructive" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ key: "", value: "" })}>
          Add Setting
        </Button>
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

export { CreateUserSettingForm };
