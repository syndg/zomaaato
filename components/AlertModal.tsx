import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AlertModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) => {
  const onChange = (open: boolean) => {
    if (open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pt-6 space-x-2 flex items-center justify-center md:justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continue
            {loading && <Loader2 className="animate-spin ml-2 h-4 w-4" />}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
