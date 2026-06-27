import type { Metadata } from "next";
import "./globals.css";
import "./custom.scss";
import Header from "../components/common/Header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/AppSidebar";
import QueryProvider from "@/provider/QueryProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
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
      </body>
    </html>
  );
}
