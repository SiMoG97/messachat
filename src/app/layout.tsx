import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
// import {  } from "geist/font";

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
