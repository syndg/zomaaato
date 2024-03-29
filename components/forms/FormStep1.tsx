"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetLocation } from "@/hooks/use-location";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormCard } from "@/components/forms/form-card";
import { FormNavigation } from "@/components/forms/form-nav";
import { Prisma, Restaurant } from "@prisma/client";
import CustomInput from "@/components/forms/CustomInput";

import {
  CreateRestaurant,
  createRestaurantSchema,
} from "@/lib/schemas/restaurant";
import { getDefaultValuesFromInitialValues } from "@/lib/utils";

interface Formstep1Props {
  initialValues: Restaurant | null;
}

const Formstep1 = ({ initialValues }: Formstep1Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { location, getLocation, permission, isLocationLoading } =
    useGetLocation();
  const defaultValues = getDefaultValuesFromInitialValues(initialValues);

  const address = initialValues?.address as Prisma.JsonObject;

  const form = useForm<CreateRestaurant>({
    resolver: zodResolver(createRestaurantSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      latitude: "",
      longitude: "",
      city: "",
      pincode: "",
      fullAddress: "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    setValue("latitude", initialValues?.lat.toString() || location.lat);
    setValue("longitude", initialValues?.lon.toString() || location.lng);
    setValue("city", (address?.city as string) || location.city);
    setValue("pincode", (address?.pincode as string) || location.pincode);
    setValue(
      "fullAddress",
      (address?.fullAddress as string) || location.fullAddress,
    );
  }, [location]);

  const onSubmit = async (data: CreateRestaurant) => {
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
                  name="latitude"
                  label="Latitude"
                  control={form.control}
                />

                <CustomInput
                  name="longitude"
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
