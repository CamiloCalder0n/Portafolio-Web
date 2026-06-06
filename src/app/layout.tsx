import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import ThreeWrapper from "@/components/three/ThreeWrapper";
import Preloader from "@/components/ui/Preloader";
import ProgressiveBackground from "@/components/ui/ProgressiveBackground";

// Sans neutra para cuerpo/UI/meta — discreta, deja brillar al serif display.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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
        className={`${inter.variable} ${dmMono.variable} ${newsreader.variable} font-sans antialiased text-text selection:bg-accent selection:text-white`}
      >
        <ProgressiveBackground />
        <Preloader />
        <ThreeWrapper />
        {children}
      </body>
    </html>
  );
}


