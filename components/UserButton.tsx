"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import {
  ChevronDown,
  User as UserIcon,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface UserButtonProps {
  user?: User;
  className?: string; // for styling the trigger only.
}

const UserButton = ({ user, className }: UserButtonProps) => {
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
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 py-1 px-3 rounded-md border-2 group border-gray-300 hover:border-zomato-red/60 focus:outline-none transition-colors duration-200 data-[state=open]:bg-gray-200",
            className
          )}
        >
          <span className="font-semibold text-lg text-gray-800">
            {user?.name.split(" ")[0]}
          </span>
          <Image
            src={user?.imageUrl as string}
            alt="User Image"
            width={25}
            height={25}
            className="rounded-full"
          />
          <ChevronDown
            size={21}
            className="group-data-[state=open]:rotate-180 transition-transform duration-300"
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          className="max-w-[350px] z-30 p-4 border-2 border-gray-300 rounded-lg animate-slideDownAndFade data-[state=closed]:animate-slideUpAndFade shadow-md"
          align="end"
          sideOffset={8}
        >
          <div className="flex items-center gap-2">
            <Image
              src={user?.imageUrl as string}
              alt="User Image"
              width={38}
              height={38}
              className="rounded-full"
            />
            <div className="flex flex-col text-sm leading-4">
              <span className="font-semibold text-gray-800">{user?.name}</span>
              <span className="text-zomato-red">{user?.email}</span>
            </div>
          </div>
          <Dropdown.Separator className="h-[1px] bg-gray-300 mt-3" />
          <div className="flex flex-col mt-3 text-gray-800">
            <Dropdown.Item asChild>
              <Link
                href=""
                className="flex items-center gap-2 py-1 px-2 rounded-sm hover:bg-gray-100 focus:outline-none transition-colors duration-150"
              >
                <UserIcon size={22} />
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Item asChild>
              <SignOutButton>
                <button className="flex items-center gap-2 py-1 px-[8.6px] text-left rounded-sm hover:bg-gray-100 focus:outline-none transition-colors duration-150">
                  <LogOut size={20} />
                  Log out
                </button>
              </SignOutButton>
            </Dropdown.Item>
          </div>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};

export default UserButton;
