import { useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const getLocation = () => {
    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation((prev) => ({
          ...prev,
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        }));
        setIsLocationLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLocationLoading(false);
      },
    );
  };

  return { location, getLocation, isLocationLoading };
};
