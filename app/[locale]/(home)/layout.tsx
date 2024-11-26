import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn"
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <html lang={locale}>
      <body>
        <KBar>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              <Header />
              {/* page main content */}
              {children}
              {/* page main content ends */}
            </SidebarInset>
          </SidebarProvider>
        </KBar>
      </body>
    </html>
  );
}
