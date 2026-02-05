import type { Metadata } from "next";
import { Inter, Mrs_Saint_Delafield, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: 'swap',
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mrs-saint-delafield",
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
        className={`${inter.variable} ${poppins.variable} ${mrsSaintDelafield.variable} font-sans antialiased bg-[var(--color-mba-background)] text-[var(--color-mba-text-primary)] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
