"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FormNavigation = ({ loading }: { loading?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const resId = searchParams.get("res_id");
  const type = searchParams.get("type");
  const currentPage = pathname.split("/").pop();

  const buttonText = type === "edit" ? "Update" : "Next";

  const onClickBack = () => {
    if (currentPage === "2") {
      router.push(`/add-new/register/1?res_id=${resId}`);
    } else {
      router.push(`/add-new/register/2?res_id=${resId}`);
    }
    router.refresh();
  };

  return (
    <div className="fixed left-0 bottom-0 w-full bg-white/70 backdrop-blur-sm border-t border-gray-300 md:border-none md:bg-none md:static">
      <div
        className={cn(
          "max-w-[1200px] mx-auto flex justify-between px-5 md:px-0 py-3",
          currentPage === "1" && "justify-end",
        )}
      >
        {currentPage !== "1" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex gap-1 items-center text-xl font-semibold"
            onClick={onClickBack}
          >
            <ArrowLeft size={22} />
            Back
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          className="text-xl font-semibold"
          disabled={loading}
        >
          {buttonText}
          {currentPage !== "3" && loading ? (
            <Loader2 size={22} className="animate-spin ml-2" />
          ) : (
            <ArrowRight size={22} />
          )}
        </Button>
      </div>
    </div>
  );
};
