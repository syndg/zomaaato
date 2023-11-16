"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RestaurantTypeTimings } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { resCategories } from "@/lib/constants";

const formSchema = z.object({
  type: z.enum(["DINEIN", "DELIVERY", "BOTH"], {
    required_error: "You need to select a type.",
  }),
  categories: z.array(z.string()).max(2, {
    message: "You can select up to 2 categories",
  }),
  cuisines: z
    .array(z.string())
    .max(2, {
      message: "You can select up to 2 cuisines",
    })
    .refine((cuisines) => cuisines.some((cuisine) => cuisine), {
      message: "You need to select at least 1 cuisine",
    }),
  timingSlots: z.array(z.string()),
  days: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

interface FormStep2Props {
  resId: string;
  initialValues: RestaurantTypeTimings | null;
}

const FormStep2 = ({ resId, initialValues }: FormStep2Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      type: "BOTH",
      cuisines: [],
      timingSlots: [],
      categories: [],
      days: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-5">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Establishment Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="BOTH" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Both, delivery and dine-in available
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="DELIVERY" />
                    </FormControl>
                    <FormLabel className="font-normal">Delivery only</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="DINEIN" />
                    </FormControl>
                    <FormLabel className="font-normal">Dine-in only</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Categories</FormLabel>
                <FormDescription>Select up to 2 best choices.</FormDescription>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {resCategories.map((category) => (
                  <FormField
                    key={category}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category}
                          className="flex items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category)}
                              onCheckedChange={(checked: boolean) => {
                                return checked
                                  ? field.onChange([...field.value, category])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== category,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {category}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormStep2;
