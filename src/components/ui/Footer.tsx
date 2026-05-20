import React from "react";

export default function Footer() {
  return (
    <footer className="bg-base border-t border-border py-8 px-6 text-center text-xs text-muted">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Juan Camilo Calderón Calderón. All rights reserved.</p>
        <p className="font-mono text-[10px]">Designed & Engineered with Next.js 15 & GSAP</p>
      </div>
    </footer>
  );
}
