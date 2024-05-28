import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCloseChatWithEscapeBtnKeyboard = () => {
  const router = useRouter();
  useEffect(() => {
    const escaplePressHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", escaplePressHandler);
    return () => window.removeEventListener("keydown", escaplePressHandler);
  }, [router]);
};
