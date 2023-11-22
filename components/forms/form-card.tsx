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
        "px-3 py-5 bg-gray-100/50 rounded-md border border-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
};
