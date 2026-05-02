import "./globals.css";
import type { Metadata, Viewport } from "next";
import TabBar from "@/components/TabBar";

export const metadata: Metadata = {
  title: "The Gita Companion",
  description:
    "An interactive walk through the Bhagavad Gita - eighteen chapters, calibrated to who you actually are. Knowledge graph, multi-turn dialogue with Krishna, personal synthesis you can keep.",
  metadataBase: new URL("https://gita-five.vercel.app"),
  openGraph: {
    title: "The Bhagavad Gita · A companion, not a substitute",
    description:
      "An interactive walk through the eighteen chapters, calibrated to who you actually are.",
    url: "https://gita-five.vercel.app",
    siteName: "The Gita Companion",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Bhagavad Gita · A companion, not a substitute",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bhagavad Gita · A companion, not a substitute",
    description:
      "An interactive walk through the eighteen chapters, calibrated to who you actually are.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gita",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0807",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="paper-grain min-h-screen">
        <TabBar />
        <main className="pb-24 md:pb-12 md:pt-20">{children}</main>
      </body>
    </html>
  );
}
