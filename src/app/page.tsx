import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Global Interactive Page UI Elements */}
      <PageTransition />
      <Navbar />

      {/* Page layout with section blocks stacked */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Hero — persistent R3F GlobalCanvas sits behind at z=0 */}
        <Hero />

        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
