import { InterfaceWrapper } from "@/components/InterfaceWrapper";
import { loginIsRequiredServer } from "@/server/auth";
import { SessionProvider } from "next-auth/react";

export default async function HomePage() {
  await loginIsRequiredServer();
  return (
    <div>
      {/* <SessionProvider> */}
      <InterfaceWrapper />
      {/* </SessionProvider> */}
    </div>
  );
}
