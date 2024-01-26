"use client";
import { usePathname } from "next/navigation";
import { cn, range } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
        <motion.span
          initial={{
            backgroundColor: "white",
          }}
          animate={{
            backgroundColor: "#16a34a",
          }}
          transition={{ duration: 0.5 }}
          className="flex items-center p-[3px] justify-center border-2 border-green-600 rounded-full shadow-md"
        >
          <CheckIcon className="h-5 w-5 text-white" />
        </motion.span>
      ) : (
        <span
          className={cn(
            "text-muted-foreground",
            status === "active" &&
              "px-3 border-2 border-gray-600 rounded-full text-black shadow-md",
          )}
        >
          Step {step}
        </span>
      )}

      {step < totalSteps && <ChevronRight className="text-muted-foreground" />}
    </div>
  );
};

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={className}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.4, type: "tween" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};
