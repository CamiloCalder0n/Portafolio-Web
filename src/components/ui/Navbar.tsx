"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((current) => !current);

  const closeMenu = () => {
    setIsOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  };

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
            ? "bg-base/95 backdrop-blur-xl border-border/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] py-3 px-6 sm:px-8"
            : "bg-base/20 backdrop-blur-md border-border/40 py-4 px-6 sm:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="font-mono font-bold text-sm tracking-[0.2em] text-text hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors flex items-center gap-1.5"
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
                className="text-xs font-mono uppercase tracking-widest text-muted hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 p-1 text-muted hover:text-text transition-colors z-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Toggle Mobile Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
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

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 bg-base/95 backdrop-blur-2xl md:hidden flex flex-col justify-center overflow-y-auto px-8 sm:px-12"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-8">
            <span className="label-caps text-muted/70 border-b border-border pb-4">
              Menu
            </span>
            <div className="flex flex-col gap-5">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-display text-4xl font-light tracking-tight text-text hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-border flex flex-col gap-1.5">
              <span className="text-sm text-text">Juan Camilo Calderón</span>
              <span className="text-xs text-muted/70">
                Systems Engineering Student · Bucaramanga, Colombia
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
