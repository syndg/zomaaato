"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/hooks/use-location";

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
  initialValues: FormValues | null;
}

const Formstep1 = ({ initialValues }: Formstep1Props) => {
  const { location, getLocation, isLocationLoading } = useLocation();
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
    setValue("lat", location.lat);
    setValue("lng", location.lng);
  }, [location]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className="p-3">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <div className="text-lg px-3 py-8 bg-gray-100/50 border border-gray-200 rounded-md">
            <h2 className="font-bold text-2xl mb-4 leading-3 text-gray-600">
              Restaurant Details
            </h2>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of your restaurant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="grid mt-3 gap-2">
                    <FormLabel className="font-semibold">
                      Description{" "}
                      <span className="text-sm font-normal">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your yummy restaurant!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="text-lg px-3 py-8 bg-gray-100/50 border border-gray-200 rounded-md">
            <h2 className="font-bold text-2xl mb-5 leading-3 text-gray-600">
              Location Information
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="lat"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel className="font-semibold">Latitude</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={disabledCondition} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lng"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel className="font-semibold">Longitude</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={disabledCondition} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button
              onClick={getLocation}
              type="button"
              size="sm"
              variant="outline"
              className="font-mono text-sm items-center mt-3 font-bold"
              disabled={isLocationLoading}
            >
              Get Location
              {isLocationLoading && (
                <Loader2 size={20} className="animate-spin ml-2" />
              )}
            </Button>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="sm" className="text-xl font-semibold">
              Next
              <ArrowRight size={22} className="" />
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default Formstep1;
