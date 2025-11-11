import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/ReactQuery";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "EduConnect",
  description: "EduConnect - Platform Manajemen Pembelajaran Terpadu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>

          {children}
          <Toaster  />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
