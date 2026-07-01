import type { Metadata } from "next";
import "./globals.css";
import "./custom.scss";
import Header from "../components/common/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import QueryProvider from "@/provider/QueryProvider";
import { Toaster } from "sonner";
import { pretendard_medium } from "@/font/localFont";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/provider/ThemeProvider";

// import { Geist } from "next/font/google";
// import { cn } from "@/lib/utils";

// const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bean Bridge",
  description: "여러 업체의 생두 리스트를 한번에 확인할 수 있는 사이트입니다.",
  icons: {
    icon: "/image/logo-simple.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={pretendard_medium.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <QueryProvider>
              <SidebarProvider>
                <TooltipProvider>
                  {/* <AppSidebar /> */}
                  <div className="w-full min-h-screen flex flex-col">
                    <Header />
                    <main className="w-full flex justify-center py-12 px-3">
                      {/* <SidebarTrigger /> */}
                      {children}
                    </main>
                  </div>
                </TooltipProvider>
              </SidebarProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
