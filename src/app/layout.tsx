import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Modern Store - Premium Shopping Experience",
  description: "Discover our curated collection of premium products with a modern shopping experience.",
  keywords: ["store", "shopping", "modern", "premium", "products"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-[#0d0f14] dark:via-[#0f1117] dark:to-[#141720]">
            <Navbar />
            <main className="
              lg:ml-[260px]
              pt-16 lg:pt-0
              min-h-screen
              transition-all duration-300
            ">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
