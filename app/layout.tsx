import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat, Oswald } from "next/font/google"; // Removed Mrs_Saint_Delafield as it's not in the new design specs
import "./globals.css";
import TopBar from "@/components/TopBar";
import Providers from "./providers";

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

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mawusi Drai | Engineer, Public Speaker & Researcher",
  description: "Official portfolio of Mawusi Drai - Engineer, Public Speaker, and Researcher.",
  keywords: "Mawusi Drai, Engineer, Public Speaker, Researcher, Ghana",
  authors: [{ name: "Mawusi Drai" }],
  openGraph: {
    title: "Mawusi Drai ",
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
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${oswald.variable} font-sans antialiased bg-[var(--color-mba-background)] text-[var(--color-mba-text-primary)] overflow-x-hidden`}
      >
        <TopBar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
