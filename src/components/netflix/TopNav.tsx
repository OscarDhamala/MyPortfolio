import { useEffect, useRef, useState } from "react";
import { Bell, Search } from "lucide-react";
import { NAV_LINKS, PROFILES, ProfileDef } from "@/data/portfolioData";

interface TopNavProps {
  profile: ProfileDef;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSwitchProfile: (id: string) => void;
  onBackToProfiles: () => void;
}

export default function TopNav({
  profile,
  searchQuery,
  onSearchChange,
  onSwitchProfile,
  onBackToProfiles,
}: TopNavProps) {
  const [solid, setSolid] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const toggleSearch = () => {
    setSearchOpen((open) => {
      if (open) onSearchChange("");
      return !open;
    });
  };

  return (
    <header ref={navRef} className={`nx-topnav ${solid ? "nx-solid" : ""}`}>
      <div className="nx-nav-left">
        <a className="nx-brand" href="#home">
          OSCAR DHAMALA
        </a>
        <ul className="nx-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="nx-nav-right">
        <div className={`nx-search-wrap ${searchOpen ? "nx-open" : ""}`}>
          <input
            id="nxSearchInput"
            type="text"
            placeholder="Search titles, tech, tags"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <button className="nx-icon-btn" type="button" aria-label="Search" onClick={toggleSearch}>
          <Search size={20} />
        </button>

        <button
          className="nx-icon-btn"
          type="button"
          aria-label="Notifications"
          onClick={() => {
            setNotifOpen((open) => !open);
            setMenuOpen(false);
          }}
        >
          <Bell size={20} />
          <span className="nx-badge-dot" />
        </button>
        {notifOpen && (
          <div className="nx-notif-panel nx-open">
            <h4>What&rsquo;s New</h4>
            <div className="nx-notif-item">
              <b>Clarity</b> shipped &mdash; an AI personal finance tracker built on MERN.
            </div>
            <div className="nx-notif-item">
              Now in production at <b>LeftclickTech</b> as Associate Software Engineer.
            </div>
            <div className="nx-notif-item">Full CV now available for download from the Journey row.</div>
          </div>
        )}

        <button
          className="nx-nav-avatar"
          type="button"
          aria-label="Account"
          onClick={() => {
            setMenuOpen((open) => !open);
            setNotifOpen(false);
          }}
        >
          {profile.image ? (
            <img src={profile.image} alt={profile.name} />
          ) : (
            <div className={`nx-avatar-fallback ${profile.className ?? ""}`}>{profile.initials}</div>
          )}
        </button>
        {menuOpen && (
          <div className="nx-dropdown nx-open">
            {PROFILES.map((item) => (
              <button
                key={item.id}
                className="nx-dropdown-item"
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  if (item.id !== profile.id) onSwitchProfile(item.id);
                }}
              >
                <div className="nx-dropdown-avatar">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className={`nx-avatar-fallback ${item.className ?? ""}`}>{item.initials}</div>
                  )}
                </div>
                <span>
                  {item.name}
                  {item.id === profile.id ? " (current)" : ""}
                </span>
              </button>
            ))}
            <div className="nx-dropdown-sep" />
            <button
              className="nx-dropdown-item"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onBackToProfiles();
              }}
            >
              Switch Profiles
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
