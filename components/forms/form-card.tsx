import { cn } from "@/lib/utils";

export const FormCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "px-3 py-8 bg-gray-100/80 rounded-md border border-gray-200",
        className,
      )}
    >
      {children}
    </div>
  );
};
