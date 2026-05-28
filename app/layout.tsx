import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; 
import "./globals.css";

const openSans = Open_Sans({ 
  subsets: ["latin"], 
  variable: "--font-open-sans" 
});

export const metadata: Metadata = {
  title: "The Enterprise AI Engineering Framework",
  description: "Standardize Your Production AI Stack.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} font-sans antialiased bg-glow-gradient min-h-screen`}>
        {children}
      </body>
    </html>
  );
}