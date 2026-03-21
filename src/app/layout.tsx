import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/shared/CustomCursor";
import SmoothScroll from "@/components/shared/SmoothScroll";
import ManifestoChat from "@/components/shared/ManifestoChat";
import QRShareButton from "@/components/shared/QRShareButton";
import PageWrapper from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: {
    default: "Newton Harris for G2K President | Tested. Proven. Ready.",
    template: "%s | Newton Harris for G2K President",
  },
  description:
    "Newton Harris, the candidate of Operational Substance and Verifiable Impact. Ushering in a New Era of Opportunities, Stability, and Respect for G2K.",
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

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <div className="scroll-progress-bar" aria-hidden="true" />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
          <QRShareButton />
          <ManifestoChat />
        </SmoothScroll>
      </body>
      {/* Netlify Identity widget — intercepts invite/recovery tokens in the URL hash */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="afterInteractive"
      />
      <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
        if (window.netlifyIdentity) {
          window.netlifyIdentity.on("init", function(user) {
            if (!user) {
              window.netlifyIdentity.on("login", function() {
                document.location.href = "/admin/";
              });
            }
          });
        }
      `}</Script>
      {/* Google Analytics — set NEXT_PUBLIC_GA_MEASUREMENT_ID in Netlify env vars */}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
