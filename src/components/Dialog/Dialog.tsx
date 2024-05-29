import { useCloseWithEscape } from "@/Hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Dialog({
  isOpen,
  closeHandler,
  confirmHandler,
  variant,
  title,
  description,
  confirmText = "Continue",
  loading,
  loadingText = "Loading",
}: {
  isOpen?: boolean;
  closeHandler: () => void;
  confirmHandler: () => void;
  variant?: "danger" | "primary";
  title: string;
  description?: string;
  confirmText?: string;
  loading?: boolean;
  loadingText?: string;
}) {
  useCloseWithEscape(closeHandler);
  return (
    <AlertDialog open={isOpen}>
      {/* <AlertDialogOverlay className="bg-[#00000093]" onClick={closeHandler}> */}
      <AlertDialogOverlay
        className="pointer-events-auto bg-[#00000093]"
        // onClick={closeHandler}
      />
      <AlertDialogContent
        className="border-none bg-grey-700"
        onFocusOutside={() => {
          console.log("clicked out");
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-5md text-white-100">
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-md text-grey-100">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeHandler}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmHandler}
            disabled={loading}
            className={cn({
              "bg-danger hover:bg-[#d12929] disabled:bg-[#ff4949]":
                variant === "danger",
            })}
          >
            {loading ? loadingText : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* </AlertDialogOverlay> */}
    </AlertDialog>
  );
}
