import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma, Restaurant } from "@prisma/client";
import { CreateRestaurant } from "./schemas/restaurant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (start: number, end: number, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const calculateBoundingBox = (
  lat: number,
  lon: number,
  radiusInKm: number,
) => {
  const earthRadius = 6371; // Km

  const latDiff = (radiusInKm / earthRadius) * (180 / Math.PI);
  const lonDiff = latDiff / Math.cos((lat * Math.PI) / 180);

  // Calculate bounding box coordinates
  const minLat = lat - latDiff;
  const maxLat = lat + latDiff;
  const minLon = lon - lonDiff;
  const maxLon = lon + lonDiff;

  // Bounding box coordinates
  const boundingBox = {
    minLatitude: minLat,
    maxLatitude: maxLat,
    minLongitude: minLon,
    maxLongitude: maxLon,
  };

  return boundingBox;
};

export const getDefaultValuesFromInitialValues = (
  initialValues: Restaurant | null,
): CreateRestaurant | null => {
  if (!initialValues) return null;

  const address = initialValues?.address as Prisma.JsonObject;

  return {
    name: initialValues.name,
    latitude: initialValues.lat.toString(),
    longitude: initialValues.lon.toString(),
    city: address?.city as string,
    pincode: address?.pincode as string,
    description: initialValues.description || undefined,
    fullAddress: (address?.fullAddress as string) || undefined,
  };
};
