"use client";
import {
  ChevronDown,
  User as UserIcon,
  UserCircle2,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type UserButtonProps = {
  className?: string; // for styling the trigger.
};

const UserButton = ({ className }: UserButtonProps) => {
  const user = useUser().user;
  const isLoaded = useUser().isLoaded;

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-1 py-1 px-3 rounded-md text-gray-800 border-2 border-gray-200 focus:outline-none">
        <Loader2 size={28} className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center gap-1 py-1 px-3 rounded-md text-gray-800 border-2 group border-gray-200 hover:border-zomato-red/60 focus:outline-none transition-colors duration-200"
      >
        <span className="font-semibold text-lg">Sign in</span>
        <UserCircle2 size={21} />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "group flex gap-1 border-2 data-[state=open]:bg-muted",
            className,
          )}
        >
          <span className="font-semibold text-lg text-gray-800">
            {user?.fullName?.split(" ")[0]}
          </span>
          <Image
            src={user?.imageUrl}
            alt="User Image"
            width={25}
            height={25}
            className="rounded-full"
          />
          <ChevronDown
            size={21}
            className="group-data-[state=open]:rotate-180 transition-transform duration-300"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="max-w-[350px] z-30 p-4 rounded-lg border-gray-300"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center gap-2 mb-3">
          <Image
            src={user?.imageUrl as string}
            alt="User Image"
            width={38}
            height={38}
            className="rounded-full"
          />
          <div className="flex flex-col text-sm leading-4">
            <span className="font-semibold text-gray-800">
              {user?.fullName}
            </span>
            <span className="text-primary">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-300" />
        <div className="flex flex-col mt-3 gap-1 text-gray-800">
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-2">
              <UserIcon size={22} />
              <span className="text-lg">Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>
              <Button size="sm" className="w-full flex gap-2">
                <LogOut size={20} />
                Log out
              </Button>
            </SignOutButton>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
