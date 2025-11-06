import z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwapper } from "@/components/loading-swapper";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";

const createUserSettingSchema = z.object({
  settings: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),
});
type CreateUserSettingSchema = z.infer<typeof createUserSettingSchema>;

function CreateUserSettingForm() {
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
      toast.success("User settings created successfully");
    } catch (error) {
      toast.error("Failed to create user settings");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_40px]">
            <FormField
              control={form.control}
              name={`settings.${index}.key`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Key"/>
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
                    <Input {...field} placeholder="Value" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="destructive" onClick={() => remove(index)}>
              <TrashIcon />
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ key: "", value: "" })}>
          Add More 
        </Button>
        <div className="flex justify-end">
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
