import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";

interface ResListCardProps {
  id: string;
  name: string;
  imageUrl: string;
  utKey: string;
}

const ResListCard = ({ id, name, imageUrl, utKey }: ResListCardProps) => {
  return (
    <Link href={`/admin/res/${id}`}>
      <Card>
        <CardHeader className="p-4">
          <div className="relative overflow-hidden rounded-md h-56">
            <Image
              src={
                imageUrl
                  ? imageUrl
                  : "https://placehold.co/600x400/png?text=Please+upload+an+image"
              }
              fill
              alt="Restaurant cover image"
              className="rounded-md object-cover"
              loading="lazy"
            />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <CardTitle>{name}</CardTitle>
          <ListMenu />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ResListCard;

const ListMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
