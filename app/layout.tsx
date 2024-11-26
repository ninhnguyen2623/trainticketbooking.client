import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/Sonner";
import NextTopLoader from "nextjs-toploader";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import StoreProvider from "@/redux/StoreProvider";
import SessionWrapper from "@/auth/SessionWrapper";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "App",
  description: "app"
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <NextIntlClientProvider messages={messages}>
              <SessionWrapper>
                <NextTopLoader showSpinner={false} />
                <Toaster />
                {children}
              </SessionWrapper>
            </NextIntlClientProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
