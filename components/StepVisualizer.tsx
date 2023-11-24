"use client";
import { usePathname } from "next/navigation";
import { cn, range } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

interface StepVisualizerProps {
  totalSteps: number;
}

const StepVisualizer = ({ totalSteps }: StepVisualizerProps) => {
  const pathName = usePathname();
  const currentPath = pathName.split("/").pop();

  return (
    <div className="flex w-full max-w-[700px] justify-center mx-auto gap-4 py-2 border border-gray-400/80 rounded-full">
      {range(1, totalSteps + 1).map((s) => (
        <Step
          key={s}
          step={s}
          currentStep={Number(currentPath)}
          totalSteps={totalSteps}
        />
      ))}
    </div>
  );
};

export default StepVisualizer;

type StepProps = {
  step: number;
  currentStep: number;
  totalSteps: number;
};

type Status = "active" | "inactive" | "complete";

const Step = ({ step, currentStep, totalSteps }: StepProps) => {
  const status: Status =
    step === currentStep
      ? "active"
      : step > currentStep
        ? "inactive"
        : "complete";

  return (
    <div className="flex items-center gap-4">
      {status === "complete" ? (
        <span className="flex items-center p-1 justify-center rounded-full bg-green-600">
          <Check className="text-white" size={20} />
        </span>
      ) : (
        <span
          className={cn(
            "rounded-md",
            status === "active" && "px-3 border border-gray-600 bg-gray-100",
            status === "inactive" && "text-gray-400",
          )}
        >
          Step {step}
        </span>
      )}
      {step < totalSteps && <ChevronRight className="text-muted-foreground" />}
    </div>
  );
};
