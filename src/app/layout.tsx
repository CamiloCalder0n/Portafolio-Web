import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThreeWrapper from "@/components/three/ThreeWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-base text-text selection:bg-accent selection:text-white`}
      >
        <ThreeWrapper />
        {children}
      </body>
    </html>
  );
}


