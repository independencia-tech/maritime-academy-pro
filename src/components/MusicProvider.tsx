// @ts-nocheck
import { createContext, useContext, useEffect, useRef, useState } from "react";
import seaWaves from "../assets/sea-waves.wav.asset.json";

const MusicCtx = createContext<any>(null);
const LS_MUTED = "map_music_muted";
const LS_ENABLED = "map_music_enabled";

export function MusicProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      setMuted(localStorage.getItem(LS_MUTED) === "1");
      setEnabled(localStorage.getItem(LS_ENABLED) === "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!audioRef.current) {
      const a = new Audio(seaWaves.url);
      a.loop = true;
      a.volume = 0.5;
      audioRef.current = a;
    }
    const a = audioRef.current;
    a.muted = muted;
    if (enabled && !muted) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, [enabled, muted]);

  const enable = () => {
    try { localStorage.setItem(LS_ENABLED, "1"); } catch {}
    setEnabled(true);
  };
  const toggleMute = () => {
    setMuted((m) => {
      const n = !m;
      try { localStorage.setItem(LS_MUTED, n ? "1" : "0"); } catch {}
      return n;
    });
    if (!enabled) enable();
  };

  return (
    <MusicCtx.Provider value={{ enabled, muted, enable, toggleMute }}>
      {children}
      <MuteButton />
    </MusicCtx.Provider>
  );
}

export function useMusic() {
  return useContext(MusicCtx) || { enabled: false, muted: false, enable: () => {}, toggleMute: () => {} };
}

function MuteButton() {
  const { muted, toggleMute } = useMusic();
  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Activer le son" : "Couper le son"}
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 9999,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "rgba(13,31,60,0.85)",
        border: "1px solid rgba(201,146,42,0.45)",
        backdropFilter: "blur(8px)",
        color: "#f0f4ff",
        fontSize: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}