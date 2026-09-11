import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { PROFILE_STORAGE_KEY, PROFILES, ProfileDef } from "@/data/portfolioData";

interface ProfileScreenProps {
  leaving: boolean;
  onSelect: (profile: ProfileDef) => void;
}

export default function ProfileScreen({ leaving, onSelect }: ProfileScreenProps) {
  const [editing, setEditing] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLastId(localStorage.getItem(PROFILE_STORAGE_KEY));
    } catch {
      // localStorage unavailable — fine, just skip the "last used" highlight.
    }
  }, []);

  const handleTileClick = (profile: ProfileDef) => {
    if (editing) {
      setEditing(false);
      return;
    }
    onSelect(profile);
  };

  return (
    <div className={`nx-screen nx-profiles ${leaving ? "nx-leaving" : ""}`}>
      <h1 className="nx-profiles-title">Who&rsquo;s exploring?</h1>

      <div className={`nx-profile-grid ${editing ? "nx-editing" : ""}`}>
        {PROFILES.map((profile) => (
          <button key={profile.id} type="button" className="nx-profile-tile" onClick={() => handleTileClick(profile)}>
            <div className={`nx-profile-avatar ${profile.className ?? ""}`}>
              {profile.image ? <img src={profile.image} alt={profile.name} /> : profile.initials}
              <div className="nx-profile-pencil">
                <Pencil size={20} />
              </div>
            </div>
            <span style={{ color: profile.id === lastId ? "#fff" : undefined }}>{profile.name}</span>
          </button>
        ))}
      </div>

      <button className="nx-manage-btn" type="button" onClick={() => setEditing((value) => !value)}>
        {editing ? "Done" : "Manage Profiles"}
      </button>
    </div>
  );
}
