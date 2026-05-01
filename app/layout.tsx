import "./globals.css";
import type { Metadata, Viewport } from "next";
import TabBar from "@/components/TabBar";

export const metadata: Metadata = {
  title: "The Gita Companion",
  description: "An interactive walk through the Bhagavad Gita — chapters, characters, and concepts.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gita",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A0807",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="paper-grain min-h-screen">
        <main className="pb-24">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}
