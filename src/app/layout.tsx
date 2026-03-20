import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Newton Harris for G2K President | Tested. Proven. Ready.",
    template: "%s | Newton Harris for G2K President",
  },
  description:
    "Newton Harris — the candidate of Operational Substance and Verifiable Impact. Ushering in a New Era of Opportunities, Stability, and Respect for G2K.",
  keywords: ["Newton Harris", "G2K", "G2K President", "Jamaica Labour Party", "JLP Youth"],
  openGraph: {
    title: "Newton Harris for G2K President",
    description:
      "Tested. Proven. Ready to Lead on Day One. Ushering in a New Era of Opportunities, Stability, and Respect.",
    type: "website",
    locale: "en_JM",
    siteName: "Newton for G2K",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
