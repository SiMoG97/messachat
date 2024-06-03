import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import OnlineStatus from "./(site)/OnlineStatus";

export const metadata = {
  title: "Messachat",
  description: "Messachat is a simple whatsapp clone",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <OnlineStatus />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
