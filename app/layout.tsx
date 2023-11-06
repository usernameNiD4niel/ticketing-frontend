import { ThemeProvider } from "@/components/provider/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ClientCookiesProvider } from "./department/it/CookiesProvider";
import { cookies } from "next/headers";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPPA",
  description: "OPPA is owned by a construction company known as DEVEX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientCookiesProvider value={cookies().getAll()}>
            <main className="w-full flex items-center flex-col">
              {children}
            </main>
          </ClientCookiesProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
