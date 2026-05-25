import type { Metadata, Viewport } from "next";
import { Syne, DM_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import ThreeWrapper from "@/components/three/ThreeWrapper";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Camilo Calderón | Full-Stack Developer & UX/UI Designer",
  description: "Systems Engineering student at UNAB. Focused on building high-performance full-stack web applications, immersive 3D experiences, and modern AI integrations.",
  keywords: ["Juan Camilo Calderón", "Systems Engineering UNAB", "Full-Stack Developer", "UX/UI Designer", "React Three Fiber", "GSAP Animations", "Bucaramanga", "Colombia"],
  authors: [{ name: "Juan Camilo Calderón Calderón" }],
  creator: "Juan Camilo Calderón Calderón",
  openGraph: {
    title: "Juan Camilo Calderón | Full-Stack Developer & UX/UI Designer",
    description: "Systems Engineering student at UNAB. Focused on building high-performance full-stack web applications, immersive 3D experiences, and modern AI integrations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Camilo Calderón | Full-Stack Developer & UX/UI Designer",
    description: "Systems Engineering student at UNAB. Focused on building high-performance full-stack web applications, immersive 3D experiences, and modern AI integrations.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${dmMono.variable} ${newsreader.variable} font-sans antialiased bg-base text-text selection:bg-accent selection:text-white`}
      >
        <ThreeWrapper />
        {children}
      </body>
    </html>
  );
}


