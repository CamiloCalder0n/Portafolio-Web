import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";
import ParticleField from "@/components/three/ParticleField";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Ambient background details live between the canvas and content. */}
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <ParticleField />
      </div>

      {/* Global Interactive Page UI Elements */}
      <PageTransition />
      <Navbar />

      {/* Page layout with section blocks stacked */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Hero shares the persistent R3F background canvas. */}
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
