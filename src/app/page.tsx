import { InterfaceWrapper } from "@/components/InterfaceWrapper";
import { loginIsRequiredServer } from "@/server/auth";

export default async function HomePage() {
  await loginIsRequiredServer();
  return (
    <div>
      <InterfaceWrapper />
    </div>
  );
}
