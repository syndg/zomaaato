"use client";
import { z } from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetLocation } from "@/hooks/use-location";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/forms/CustomInput";
import { FormCard } from "@/components/forms/form-card";
import { Prisma, Restaurant } from "@prisma/client";
import { FormNavigation } from "./form-nav";

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
  city: z.string().max(20),
  pincode: z
    .string()
    .max(6)
    .regex(/^[0-9]+$/, {
      message: "Pincode must be a number",
    }),
  fullAddress: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Formstep1Props {
  initialValues: Restaurant | null;
}

interface DefValues extends Restaurant {
  lat: string;
  lng: string;
  city: string;
  pincode: string;
  fullAddress: string;
}

const Formstep1 = ({ initialValues }: Formstep1Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { location, getLocation, permission, isLocationLoading } =
    useGetLocation();

  let defValues: DefValues | null = null;
  const address = initialValues?.address as Prisma.JsonObject;

  if (initialValues !== null) {
    defValues = {
      ...initialValues,
      lat: address?.lat as string,
      lng: address?.lng as string,
      city: address?.city as string,
      pincode: address?.pincode as string,
      fullAddress: address?.fullAddress as string,
    };
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defValues || {
      name: "",
      description: "",
      lat: "",
      lng: "",
      city: "",
      pincode: "",
      fullAddress: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    setValue("lat", (address?.lat as string) || location.lat);
    setValue("lng", (address?.lng as string) || location.lng);
    setValue("city", (address?.city as string) || location.city);
    setValue("pincode", (address?.pincode as string) || location.pincode);
    setValue(
      "fullAddress",
      (address?.fullAddress as string) || location.fullAddress,
    );
  }, [location]);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      if (initialValues) {
        await axios
          .patch(`/api/restaurants/${initialValues.id}`, data)
          .then(() => {
            router.push("/add-new");
            router.refresh();
            toast.success("Updated successfully");
          });
      } else {
        await axios.post("/api/restaurants", data).then((res) => {
          router.push(`/add-new/register/2?res_id=${res.data.id}`);
          toast.success(`Restaurant "${res.data.name}" created`);
        });
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-3">
        <div className="grid gap-5">
          <h1 className="font-bold text-2xl mt-2">Restaurant Information</h1>
          <FormCard className="grid gap-3 text-lg">
            <h2 className="font-bold text-xl mb-2 leading-3 text-gray-800">
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
            <h2 className="font-bold text-gray-800 text-xl mb-5 leading-3">
              Location Information
            </h2>
            <div className="grid gap-3">
              <CustomInput
                name="fullAddress"
                label="Full Address"
                control={form.control}
                placeholerText="Enter your restaurant's full address"
                optional
              />
              <div className="grid grid-cols-2 gap-2">
                <CustomInput
                  name="lat"
                  label="Latitude"
                  control={form.control}
                />

                <CustomInput
                  name="lng"
                  label="Longitude"
                  control={form.control}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <CustomInput name="city" label="City" control={form.control} />

                <CustomInput
                  name="pincode"
                  label="Pincode"
                  control={form.control}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <Button
                onClick={getLocation}
                type="button"
                size="sm"
                variant="outline"
                className="text-sm items-center font-bold border-gray-400"
                disabled={isLocationLoading}
              >
                Get location
                {isLocationLoading && permission && (
                  <Loader2 size={20} className="animate-spin ml-2" />
                )}
              </Button>
              {!permission && (
                <p className="text-red-500 text-sm">
                  You have denied access to your location.
                </p>
              )}
            </div>
            <p className="mt-3 border-primary border p-3 text-xs rounded-md">
              <strong className="text-primary">Note:</strong> The Get location
              button uses your current location through the browser, which might
              not be accurate everytime. In that case, you can enter the correct
              location manually.
            </p>
          </FormCard>
        </div>
        <FormNavigation loading={isSubmitting} />
      </form>
    </Form>
  );
};

export default Formstep1;
