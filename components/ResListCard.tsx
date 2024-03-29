"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import AlertModal from "./AlertModal";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookUser,
  FileType,
  MoreHorizontal,
  Settings2,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";

interface ResListCardProps {
  id: string;
  name: string;
  image: {
    id: string;
    imageUrl: string;
    utKey: string;
  };
  address: Prisma.JsonObject;
}

const ResListCard = ({ id, name, image, address }: ResListCardProps) => {
  const city = address?.city as string;
  return (
    <Card>
      <Link href={`/restaurants/admin?res_id=${id}`}>
        <CardHeader className="p-4">
          <div className="relative overflow-hidden rounded-md h-56">
            <Image
              src={
                image
                  ? image.imageUrl
                  : "https://placehold.co/600x400/png?text=Please+upload+an+image"
              }
              alt="Restaurant cover image"
              className="rounded-md object-cover"
              loading="lazy"
              fill
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          <ListMenu resId={id} imageId={image?.id} imageUtKey={image?.utKey} />
        </div>
        <CardDescription>{city}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ResListCard;

type ListMenuProps = {
  resId: string;
  imageId: string;
  imageUtKey: string;
};

const ListMenu = ({ resId, imageId, imageUtKey }: ListMenuProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (imageId && imageUtKey) {
        await axios.delete(
          `/api/restaurants/${resId}/resImages?id=${imageId}&utKey=${imageUtKey}`,
        );
      }
      await axios.delete(`/api/restaurants/${resId}`);
      router.refresh();
      toast.success("Restaurant deleted successfully");
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Settings2 className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/add-new/register/1?res_id=${resId}&type=edit`}
                    >
                      <BookUser className="mr-2 h-4 w-4" />
                      Details
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href={`/add-new/register/2?res_id=${resId}&type=edit`}
                    >
                      <FileType className="mr-2 h-4 w-4" />
                      Type and Timings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href={`/add-new/register/3?res_id=${resId}&type=edit`}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Images
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem asChild>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  );
};
