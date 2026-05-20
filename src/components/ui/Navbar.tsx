"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] sm:w-[calc(100%-48px)] max-w-5xl z-50 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-base/70 backdrop-blur-xl border-border/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-3 px-6 sm:px-8"
            : "bg-base/20 backdrop-blur-md border-border/40 py-4 px-6 sm:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="font-mono font-bold text-sm tracking-[0.2em] text-text hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            JC.DEV
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono uppercase tracking-widest text-muted hover:text-text transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 p-1 text-muted hover:text-text transition-colors z-50 focus:outline-none"
            aria-label="Toggle Mobile Menu"
            aria-expanded={isOpen}
          >
            <span
              className={`w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${
                isOpen ? "translate-y-[7.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-current rounded-full transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${
                isOpen ? "-translate-y-[7.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-base/95 backdrop-blur-2xl md:hidden transition-all duration-500 flex flex-col justify-center px-8 sm:px-12 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8">
          <span className="font-mono text-[10px] text-accent tracking-[0.25em] uppercase border-b border-border pb-4">
            [ Navigation Index ]
          </span>
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-medium tracking-tight text-text hover:text-accent transition-colors duration-300 flex items-baseline gap-3 transform transition-transform duration-500 ${
                  isOpen ? "translate-x-0" : "-translate-x-8"
                }`}
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                <span className="font-mono text-xs text-muted/40">0{idx + 1}.</span>
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-border flex flex-col gap-2">
            <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
              Juan Camilo Calderón Calderón
            </span>
            <span className="font-mono text-[9px] text-muted/60 tracking-wider">
              Systems Engineering Student
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
