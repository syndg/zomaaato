import { useState } from "react";
import axios from "axios";

const BASE_URL = `https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_SECRET}`;

export const useGetLocation = () => {
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    city: "",
    pincode: "",
    fullAddress: "",
  });
  const [permission, setPermission] = useState(true);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const getLocation = () => {
    setIsLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .get(
            `${BASE_URL}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
          )
          .then((res) => {
            setLocation({
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString(),
              city: res.data.address.city,
              pincode: res.data.address.postcode,
              fullAddress: res.data.display_name,
            });
            setPermission(true);
            setIsLocationLoading(false);
          });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setPermission(false);
        }
        setIsLocationLoading(false);
      },
    );
  };

  return { location, getLocation, permission, isLocationLoading };
};
