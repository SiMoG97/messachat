"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

type Props = {
  label: string;
  loginProviderName: string;
  ProviderIcon: React.ReactNode;
};

export function SignInButton({
  label,
  loginProviderName,
  ProviderIcon,
}: Props) {
  return (
    <Button
      variant="outline"
      className="border-1 hover:bg-green flex w-full items-center gap-2 bg-grey-300 text-3sm font-bold text-white-100  "
      onClick={() =>
        signIn(loginProviderName, {
          callbackUrl: "/",
        })
      }
    >
      {ProviderIcon}
      <span>{label}</span>
    </Button>
  );
}
