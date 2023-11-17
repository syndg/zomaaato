import { useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const [permission, setPermission] = useState(true);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const getLocation = () => {
    setIsLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        });
        setPermission(true);
        setIsLocationLoading(false);
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
