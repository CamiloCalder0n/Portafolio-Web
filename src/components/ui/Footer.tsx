export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 sm:px-12 md:px-24 pt-10 pb-10 sm:pt-12 sm:pb-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {year} Juan Camilo Calderón Calderón
        </p>
        <div className="flex items-center gap-6">
          <p className="text-sm text-muted/70">
            Built with Next.js 15 &amp; GSAP
          </p>
          <a
            href="#hero"
            className="link-underline text-sm text-muted hover:text-text transition-colors duration-300 focus-visible:outline-none focus-visible:text-accent"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
