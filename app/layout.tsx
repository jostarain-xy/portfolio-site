import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import { FloatingContact } from "@/components/floating-contact";

export const metadata: Metadata = {
  title: "个人作品集 | 视频剪辑师",
  description: "简洁科技感的个人作品集网站，适合视频剪辑师和内容创作者。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
