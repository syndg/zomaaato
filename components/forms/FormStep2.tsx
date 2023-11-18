"use client";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { RestaurantTypeTimings } from "@prisma/client";
import { Form } from "@/components/ui/form";
import CustomSelect from "./CustomSelect";
import CustomRadio from "@/components/forms/CustomRadio";
import CustomCheckbox from "@/components/forms/CustomCheckbox";
import { Button } from "@/components/ui/button";
import {
  resCategories,
  cuisines,
  days,
  typeOptions,
  timeOptions,
} from "@/lib/constants";

const formSchema = z.object({
  type: z.enum(["DINEIN", "DELIVERY", "BOTH"], {
    required_error: "You need to select a type.",
  }),
  categories: z
    .array(z.string())
    .max(2, {
      message: "You can select up to 2 categories",
    })
    .refine((categories) => categories.some((category) => category), {
      message: "You need to select at least 1 category",
    }),
  cuisines: z
    .array(z.string())
    .max(2, {
      message: "You can select up to 2 cuisines",
    })
    .refine((cuisines) => cuisines.some((cuisine) => cuisine), {
      message: "You need to select at least 1 cuisine",
    }),
  open: z.string(),
  close: z.string(),
  days: z.array(z.string()).refine((days) => days.some((day) => day), {
    message: "You need to select at least 1 open day",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface FormStep2Props {
  resId: string;
  initialValues: RestaurantTypeTimings | null;
}

const FormStep2 = ({ resId, initialValues }: FormStep2Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      cuisines: [],
      categories: [],
      days: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await axios
        .post(`/api/restaurants/${resId}/resTypeandTime`, data)
        .then((res) => {
          router.push(`/add-new/register/3?res_id=${res.data.restaurantId}`);
          toast.success("Submitted successfully");
        });
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-5">
        <CustomRadio
          control={form.control}
          name="type"
          options={typeOptions}
          label="Establishment type"
        />
        <CustomCheckbox
          control={form.control}
          name="categories"
          items={resCategories}
          label="Categories"
          description="Select up to 2 best choices."
        />
        <CustomCheckbox
          control={form.control}
          name="cuisines"
          items={cuisines}
          label="Cuisines"
          description="Select up to 2 best choices."
        />
        <CustomSelect
          control={form.control}
          name="open"
          label="opens at"
          options={timeOptions}
          placeholderText="Select time"
        />
        <CustomSelect
          control={form.control}
          name="close"
          label="closes at"
          options={timeOptions}
          placeholderText="Select time"
        />
        <CustomCheckbox
          control={form.control}
          name="days"
          items={days}
          label="Days"
          description="Select the days your establishment is open."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormStep2;
