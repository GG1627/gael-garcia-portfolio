import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Anton, Righteous, Black_Ops_One, Orbitron, Audiowide, Racing_Sans_One, Iceberg } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});

const blackOps = Black_Ops_One({
  variable: "--font-blackops",
  weight: "400",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["800", "900"],
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ["latin"],
});

const racing = Racing_Sans_One({
  variable: "--font-racing",
  weight: "400",
  subsets: ["latin"],
});

const iceberg = Iceberg({
  variable: "--font-iceberg",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gael Garcia Portfolio",
  description: "Portfolio of Gael Garcia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${anton.variable} ${righteous.variable} ${blackOps.variable} ${orbitron.variable} ${audiowide.variable} ${racing.variable} ${iceberg.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
