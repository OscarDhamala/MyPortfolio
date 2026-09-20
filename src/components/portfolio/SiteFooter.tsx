const SiteFooter = () => {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-2 px-6 py-4 text-center font-mono text-[11px] tracking-wider text-muted-foreground sm:h-16 sm:flex-row sm:justify-between sm:py-0 sm:text-left">
        <span>&copy; 2025 OSCAR DHAMALA</span>
        <a href="#home" className="transition-colors hover:text-foreground">
          BACK TO TOP
        </a>
      </div>
    </footer>
  );
};

export default SiteFooter;
