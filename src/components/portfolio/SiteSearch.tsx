import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SEARCH_INDEX, SearchItem } from "@/data/portfolioData";
import { IconSearch } from "@/components/portfolio/icons";

const MAX_RESULTS = 6;
const ROTATE_MS = 2200;

const SiteSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const rotatingPhrases = useMemo(() => SEARCH_INDEX.map((item) => item.label), []);

  useEffect(() => {
    if (query) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [query, rotatingPhrases.length]);

  const results = useMemo<SearchItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((item) => item.keywords.includes(q)).slice(0, MAX_RESULTS);
  }, [query]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selectItem = (item: SearchItem) => {
    document.getElementById(item.sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectItem(results[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-[420px]">
      <div className="glass flex items-center gap-2.5 rounded-full px-4 py-3">
        <IconSearch className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder=""
            aria-label="Search this portfolio: projects, skills, and experience"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls="site-search-listbox"
            aria-autocomplete="list"
            className="w-full bg-transparent text-sm text-foreground focus:outline-none"
          />
          {!query && (
            <div className="pointer-events-none absolute inset-0 flex items-center gap-1 overflow-hidden">
              <span className="flex-shrink-0 text-sm text-muted-foreground">Search</span>
              <span className="relative h-[1.4em] min-w-0 flex-1 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={phraseIndex}
                    initial={{ y: "55%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-55%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center whitespace-nowrap text-sm text-muted-foreground"
                  >
                    &ldquo;{rotatingPhrases[phraseIndex]}&rdquo;&hellip;
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          id="site-search-listbox"
          role="listbox"
          className="glass absolute left-0 right-0 top-[calc(100%+8px)] z-20 flex flex-col overflow-hidden rounded-2xl p-1.5"
        >
          {results.length === 0 ? (
            <p className="px-3.5 py-3 text-sm text-muted-foreground">No matches — try a project, skill, or role.</p>
          ) : (
            results.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={i === highlighted}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => selectItem(item)}
                className={`flex w-full flex-col items-start gap-0.5 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                  i === highlighted ? "bg-foreground/10" : ""
                }`}
              >
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.sublabel}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SiteSearch;
