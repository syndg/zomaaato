"use client";
import axios from "axios";
import { ZodError } from "zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { Prisma, RestaurantTypeTimings } from "@prisma/client";
import { Form, FormLabel } from "@/components/ui/form";
import CustomSelect from "@/components/forms/CustomSelect";
import CustomRadio from "@/components/forms/CustomRadio";
import CustomCheckbox from "@/components/forms/CustomCheckbox";
import {
  resCategories,
  cuisines,
  days,
  typeOptions,
  timeOptions,
} from "@/lib/constants";
import { FormCard } from "./form-card";
import { FormNavigation } from "./form-nav";

import {
  CreateResTypeTime,
  createResTypeTimeSchema,
} from "@/lib/schemas/restaurant";

interface FormStep2Props {
  resId: string;
  initialValues: RestaurantTypeTimings | null;
}

interface DefValues extends RestaurantTypeTimings {
  open: string;
  close: string;
}

const FormStep2 = ({ resId, initialValues }: FormStep2Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let defValues: DefValues | null = null;
  const timings = initialValues?.timingSlots as Prisma.JsonObject;

  if (initialValues !== null) {
    defValues = {
      ...initialValues,
      open: timings?.open as string,
      close: timings?.close as string,
    };
  }

  const form = useForm<CreateResTypeTime>({
    resolver: zodResolver(createResTypeTimeSchema),
    defaultValues: defValues || {
      cuisines: [],
      categories: [],
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      open: "",
      close: "",
    },
  });

  const onSubmit = async (data: CreateResTypeTime) => {
    try {
      setIsSubmitting(true);

      if (data.open === data.close) {
        throw new ZodError([
          {
            code: "custom",
            message: "Open and close time cannot be the same",
            path: ["open"],
          },
        ]);
      }

      if (initialValues) {
        await axios
          .patch(`/api/restaurants/${resId}/resTypeandTime`, data)
          .then(() => {
            router.push("/add-new");
            router.refresh();
            toast.success("Updated successfully");
          });
      } else {
        await axios
          .post(`/api/restaurants/${resId}/resTypeandTime`, data)
          .then((res) => {
            router.push(`/add-new/register/3?res_id=${res.data.restaurantId}`);
            toast.success("Submitted successfully");
          });
      }
    } catch (err: any) {
      if (err instanceof ZodError) {
        return toast.error(err.issues[0].message);
      }
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-3 mb-14 lg:mb-0 p-3 mt-5"
      >
        <FormLabel className="text-2xl mb-3 font-bold">
          Restaurant Type and Timings
        </FormLabel>

        <FormCard>
          <CustomRadio
            control={form.control}
            name="type"
            options={typeOptions}
            label="Establishment type"
          />
        </FormCard>

        <FormCard>
          <CustomCheckbox
            control={form.control}
            name="categories"
            items={resCategories}
            label="Categories"
            description="Select up to 2 best choices."
            maxSelections={2}
          />
        </FormCard>

        <FormCard>
          <CustomCheckbox
            control={form.control}
            name="cuisines"
            items={cuisines}
            label="Cuisines"
            description="Select up to 2 best choices."
            maxSelections={2}
            scroll
          />
        </FormCard>

        <FormCard className="space-y-2">
          <FormLabel className="font-semibold text-lg">Timings</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <CustomSelect
              control={form.control}
              name="open"
              label="Opens at"
              options={timeOptions}
              placeholderText="Select time"
            />
            <CustomSelect
              control={form.control}
              name="close"
              label="Closes at"
              options={timeOptions}
              placeholderText="Select time"
            />
          </div>
        </FormCard>

        <FormCard>
          <CustomCheckbox
            control={form.control}
            name="days"
            items={days}
            label="Days"
            description="Select the days your establishment is open."
          />
        </FormCard>
        <FormNavigation loading={isSubmitting} />
      </form>
    </Form>
  );
};

export default FormStep2;
