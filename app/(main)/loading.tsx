"use client";
import { Bars } from "react-loader-spinner";

export default function FormLoading() {
  return (
    <div className="h-[80vh] grid place-content-center">
      <Bars height="50" width="50" color="#EF4F23" />
    </div>
  );
}
