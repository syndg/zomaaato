"use client";
import { Bars } from "react-loader-spinner";

export default function FormLoading() {
  return (
    <div className="h-[80vh] grid place-content-center">
      <Bars height="60" width="60" color="#EF4F23" />
    </div>
  );
}
