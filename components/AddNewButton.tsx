"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const AddNewButton = () => {
  return (
    <Button size="sm" asChild>
      <Link
        href="/add-new/register/1"
        className="self-start mx-auto text-xl rounded-lg font-semibold gap-2 active:scale-95 transition-all duration-100"
      >
        Add new
        <PlusCircle size={22} />
      </Link>
    </Button>
  );
};

export default AddNewButton;
