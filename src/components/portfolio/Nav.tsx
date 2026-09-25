import { useState } from "react";
import { NAV_LINKS, SectionId } from "@/data/portfolioData";
import { IconClose, IconMenu } from "@/components/portfolio/icons";
import ThemeSlider from "@/components/portfolio/ThemeSlider";

interface NavProps {
  active: SectionId;
  themeProgress: number;
  onThemeProgressChange: (value: number) => void;
}

const NavLinkList = ({
  active,
  onClick,
  className,
  linkClassName,
}: {
  active: SectionId;
  onClick?: () => void;
  className?: string;
  linkClassName?: (isActive: boolean) => string;
}) => (
  <div className={className}>
    {NAV_LINKS.map((link) => {
      const isActive = link.id === active;
      return (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={onClick}
          aria-current={isActive ? "page" : undefined}
          className={
            linkClassName?.(isActive) ??
            `text-sm transition-colors ${
              isActive ? "font-semibold text-accent" : "font-medium text-muted-foreground hover:text-foreground"
            }`
          }
        >
          {link.label}
        </a>
      );
    })}
  </div>
);

const Nav = ({ active, themeProgress, onThemeProgressChange }: NavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="glass relative mx-auto max-w-[1180px] rounded-2xl">
        <div className="relative flex h-[68px] items-center justify-between gap-4 px-5 sm:px-6">
          <a href="#home" className="flex flex-shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[12px] font-semibold text-background">
              OD
            </div>
            <div className="flex flex-col gap-0.5 leading-tight">
              <span className="text-[14.5px] font-bold tracking-tight">Oscar Dhamala</span>
              <span className="font-mono text-[9.5px] tracking-wider text-muted-foreground">FULL-STACK ENGINEER</span>
            </div>
          </a>

          <NavLinkList
            active={active}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 min-[900px]:flex"
          />

          <div className="flex flex-shrink-0 items-center gap-3">
            <a
              href="#contact"
              className="hidden whitespace-nowrap items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85 min-[900px]:inline-flex"
            >
              Get in touch
            </a>
            <ThemeSlider value={themeProgress} onChange={onThemeProgressChange} />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/40 text-foreground min-[900px]:hidden"
            >
              {mobileOpen ? <IconClose className="h-[18px] w-[18px]" /> : <IconMenu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="flex flex-col gap-1 border-t border-border/60 px-5 pb-5 pt-2 min-[900px]:hidden">
            <NavLinkList
              active={active}
              onClick={closeMobile}
              className="flex flex-col"
              linkClassName={(isActive) =>
                `border-b border-border/60 py-3 text-sm last:border-none ${
                  isActive ? "font-semibold text-accent" : "font-medium text-muted-foreground"
                }`
              }
            />
            <a
              href="#contact"
              onClick={closeMobile}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-background"
            >
              Get in touch
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
