import "~/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "SearchHuman",
  description: "Find a human",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full w-full`}>
      <body className="flex h-full w-full flex-col">
        <TRPCReactProvider>
          <Header />
          {children}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
