import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./allfireservices.css";
import "./responsive.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterReveal from "@/components/FooterReveal";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All Fire Services Australia",
  description: "All Fire Services provides professional fire safety services, including testing, inspections, and compliance across Greater Sydney Area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-black`}>
        <SmoothScrolling>
          <FooterReveal footerContent={<Footer />}>
            <Navbar />
            {children}
          </FooterReveal>
        </SmoothScrolling>
        <Chatbot />
      </body>
    </html>
  );
}

