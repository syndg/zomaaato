"use client";
import { z } from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "@/hooks/use-location";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/forms/CustomInput";
import { FormCard } from "@/components/forms/form-card";
import { Restaurant } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30),
  description: z.string().max(120).optional(),
  lat: z
    .string()
    .regex(/^([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?))$/, {
      message: "Latitude must be a value between -90 and 90",
    })
    .trim(),
  lng: z
    .string()
    .regex(/^([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))$/, {
      message: "Longitude must be a value between -180 and 180.",
    })
    .trim(),
});

type FormValues = z.infer<typeof formSchema>;

interface Formstep1Props {
  initialValues: Restaurant | null;
}

const Formstep1 = ({ initialValues }: Formstep1Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { location, getLocation, permission, isLocationLoading } =
    useLocation();
  const disabledCondition = location.lat !== "" && location.lng !== "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      lat: "",
      lng: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    setValue("lat", initialValues?.lat || location.lat);
    setValue("lng", initialValues?.lng || location.lng);
  }, [location]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      if (initialValues) {
        await axios
          .patch(`/api/restaurants/${initialValues.id}`, data)
          .then((res) => {
            router.push(`/add-new/register/2?res_id=${res.data.id}`);
            toast.success("Updated successfully");
          });
        return;
      }

      await axios.post("/api/restaurants", data).then((res) => {
        router.push(`/add-new/register/2?res_id=${res.data.id}`);
        toast.success(`Restaurant "${res.data.name}" created`);
      });
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <div className="p-3">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormCard className="grid gap-3 text-lg">
            <h2 className="font-bold text-2xl mb-2 leading-3 text-gray-800">
              Restaurant Details
            </h2>

            <CustomInput
              name="name"
              label="Name"
              control={form.control}
              placeholerText="Name of your restaurant"
            />

            <CustomInput
              name="description"
              label="Description"
              control={form.control}
              placeholerText="Describe your yummy restaurant!"
              optional
            />
          </FormCard>
          <FormCard className="grid text-lg">
            <h2 className="font-bold text-gray-800 text-2xl mb-5 leading-3">
              Location Information
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <CustomInput
                name="lat"
                label="Latitude"
                control={form.control}
                disabled={disabledCondition}
              />

              <CustomInput
                name="lng"
                label="Longitude"
                control={form.control}
                disabled={disabledCondition}
              />
            </div>
            <div className="flex items-center gap-3 mt-3">
              <Button
                onClick={getLocation}
                type="button"
                size="sm"
                variant="outline"
                className="font-mono text-sm items-center font-bold"
                disabled={isLocationLoading}
              >
                Get Location
                {isLocationLoading && !disabledCondition && permission && (
                  <Loader2 size={20} className="animate-spin ml-2" />
                )}
              </Button>
              {!permission && (
                <p className="text-red-500">
                  You have denied access to your location.
                </p>
              )}
            </div>
          </FormCard>
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              className="text-xl font-semibold"
              disabled={isSubmitting}
            >
              Next
              {isSubmitting ? (
                <Loader2 size={22} className="animate-spin ml-2" />
              ) : (
                <ArrowRight size={22} />
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default Formstep1;
