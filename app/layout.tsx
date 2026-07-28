import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./drivelodge.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drivelodge | UK High-Top & Elevating Camper Van Roofs",
  description: "Drivelodge designs, manufactures, and installs high-top and elevating roofs for camper van conversions. Proudly built in Yorkshire, with 30+ years of expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-black`}>
        <SmoothScrolling>
          <FooterReveal footerContent={<Footer />}>
            <Navbar />
            {children}
          </FooterReveal>
        </SmoothScrolling>
      </body>
    </html>
  );
}

