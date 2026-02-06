import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google"; // Removed Mrs_Saint_Delafield as it's not in the new design specs
import "./globals.css";
import TopBar from "@/components/TopBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "John Dumelo | Actor, Politician & Entrepreneur",
  description: "Official portfolio of John Dumelo - Member of Parliament for Ayawaso West Wuogon, Deputy Minister of Food and Agriculture, Actor, and Entrepreneur.",
  keywords: "John Dumelo, Politician, Actor, Entrepreneur, Ghana, Ayawaso West Wuogon, Deputy Minister, Agriculture",
  authors: [{ name: "John Dumelo" }],
  openGraph: {
    title: "John Dumelo | Actor, Politician & Entrepreneur",
    description: "Member of Parliament for Ayawaso West Wuogon, Deputy Minister of Food and Agriculture, and Award-Winning Actor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased bg-[var(--color-mba-background)] text-[var(--color-mba-text-primary)] overflow-x-hidden`}
      >
        <TopBar />
        {children}
      </body>
    </html>
  );
}
