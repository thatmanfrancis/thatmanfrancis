"use client";

import { useEffect, useState } from "react";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs: number;
  durationMs: number;
  isFallback?: boolean;
}

export default function ContactGraphic() {
  const [time, setTime] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [activeCards, setActiveCards] = useState<number[]>([2, 1, 0]); // Order from back to front

  const [spotifyData, setSpotifyData] = useState<SpotifyTrack | null>(null);
  const [progressMs, setProgressMs] = useState<number>(0);

  const [terminalCommand, setTerminalCommand] = useState<string>("whoami");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Poll Spotify track data
  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (res.ok) {
          const data = await res.json();
          setSpotifyData(data);
          setProgressMs(data.progressMs);
        }
      } catch (err) {
        console.error("Failed to fetch Spotify track:", err);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  // Tick the song progress every second when a track is actively playing
  useEffect(() => {
    if (!spotifyData || !spotifyData.isPlaying) return;

    const interval = setInterval(() => {
      setProgressMs((prev) => {
        if (prev >= spotifyData.durationMs) {
          return spotifyData.durationMs;
        }
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [spotifyData]);

  const trackTitle = spotifyData?.title || "After Hours (Lofi Cut)";
  const trackArtist = spotifyData?.artist || "Selected Chill Beats";
  const trackAlbumUrl = spotifyData?.albumImageUrl || "";
  const trackSongUrl = spotifyData?.songUrl || "https://open.spotify.com";
  const trackDuration = spotifyData?.durationMs || 225000;
  const isPlaying = spotifyData?.isPlaying || false;
  const isFallback = spotifyData?.isFallback ?? true;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.min(100, (progressMs / trackDuration) * 100);

  // Lagos local time is UTC+1 (no DST adjustments typically)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Lagos",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  const bringToFront = (id: number) => {
    setActiveCards((prev) => {
      // Remove id from its current position and push to the end (top)
      const filtered = prev.filter((item) => item !== id);
      return [...filtered, id];
    });
  };

  const commandContents: Record<string, string[]> = {
    whoami: [
      "sys: fetching profile...",
      "NAME: Francis Uzoigwe.",
      "ROLE: Full-Stack Software Engineer",
      "BASE: Lagos, NG",
      "STATUS: Ready to build.",
    ],
    neofetch: [
      "sys: gathering system specs...",
      "OS: Next.js 16.2 / React 19",
      "UX: Brutalist HSL Styling",
      "DATA: Prisma / PostgreSQL",
      "SHELL: Tailwind v4",
    ],
    integrity: [
      "sys: running self-checks...",
      "COFFEE LEVEL: 89% (Optimal)",
      "UPTIME: 100% (Solid)",
      "GRID ACCURACY: 0.2px tolerance",
      "AVAILABILITY: OPEN FOR CHAT",
    ],
  };

  const runCommand = (cmd: string) => {
    if (isTyping) return;
    setTerminalCommand(cmd);
    setIsTyping(true);
    setTerminalOutput([]);

    const lines = commandContents[cmd] || [];
    let currentLineIndex = 0;

    const interval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        setTerminalOutput((prev) => [...prev, lines[currentLineIndex]]);
        currentLineIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 150);
  };

  // Initialize neofetch/whoami once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      runCommand("whoami");
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine positions and rotations based on their stack order
  const getCardStyle = (id: number) => {
    const stackPosition = activeCards.indexOf(id); // 0 (bottom) to 2 (top)
    const isTop = stackPosition === 2;
    const isMiddle = stackPosition === 1;

    // Base layout transformation properties
    let baseRotate = "0deg";
    let baseTranslate = "translate(0px, 0px)";
    let hoverSpread = "translate(0px, 0px)";

    if (id === 0) {
      // Now Playing Card
      baseRotate = "-6deg";
      baseTranslate = "translate(-12px, -8px)";
      hoverSpread =
        "group-hover:-translate-x-32 group-hover:-translate-y-8 group-hover:-rotate-12";
    } else if (id === 1) {
      // Lagos Status Card
      baseRotate = "5deg";
      baseTranslate = "translate(16px, 12px)";
      hoverSpread =
        "group-hover:translate-x-28 group-hover:translate-y-6 group-hover:rotate-12";
    } else if (id === 2) {
      // Retro CLI Terminal Card
      baseRotate = "-2deg";
      baseTranslate = "translate(-4px, 16px)";
      hoverSpread =
        "group-hover:translate-y-24 group-hover:-translate-x-4 group-hover:rotate-3";
    }

    return {
      zIndex: stackPosition * 10,
      transform: `scale(${isTop ? 1 : isMiddle ? 0.96 : 0.92}) ${baseTranslate} rotate(${baseRotate})`,
      className: `absolute w-[290px] sm:w-[320px] aspect-[4/5] sm:aspect-[3.6/4.5] rounded-lg p-6 sm:p-7 border transition-all duration-500 ease-out cursor-pointer hover:scale-[1.02] ${hoverSpread} ${
        isTop
          ? "shadow-sm shadow-zinc-950/5 dark:shadow-zinc-950/20 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          : "shadow-xs border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 text-zinc-650 dark:text-zinc-400 opacity-90 group-hover:opacity-100"
      }`,
    };
  };

  return (
    <div className="group relative w-full h-[520px] sm:h-[580px] flex items-center justify-center select-none overflow-visible py-12">
      {/* Background Subtle Vibe Grid Indicator */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="desk-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#desk-grid)" />
        </svg>
      </div>

      {/* Floating Instructions Text */}
      <div className="absolute top-0 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 transition-opacity duration-300 group-hover:opacity-0">
        Hover to spread • Click to shuffle
      </div>
      <div className="absolute top-0 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Tactile Desk Stack Active
      </div>

      <div className="relative w-full max-w-[340px] h-[420px] flex items-center justify-center">
        {/* ==================== CARD 0: NOW PLAYING ==================== */}
        <a
          href={trackSongUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            zIndex: getCardStyle(0).zIndex,
            transform: getCardStyle(0).transform,
          }}
          className={`${getCardStyle(0).className} block no-underline`}
          onClick={(e) => {
            // Only navigate if it's the top card, otherwise shuffle it to the front
            const stackPosition = activeCards.indexOf(0);
            if (stackPosition !== 2) {
              e.preventDefault();
              bringToFront(0);
            }
          }}
        >
          <div className="h-full flex flex-col justify-between">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-3">
              {/* Spotify Logo + playback state */}
              <span className="flex items-center gap-1.5">
                {isPlaying && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                )}
                {/* Spotify SVG Logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[14px] h-[14px] fill-[#1DB954]"
                  aria-label="Spotify"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {isFallback
                    ? "SPOTIFY"
                    : isPlaying
                      ? "NOW PLAYING"
                      : "LAST PLAYED"}
                </span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                01/03
              </span>
            </div>

            {/* Vinyl Record Player */}
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <div className="relative group/vinyl w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
                {/* Vinyl Record */}
                <div
                  className={`absolute inset-0 rounded-full bg-zinc-950 dark:bg-black border-4 border-zinc-900 shadow-xl flex items-center justify-center ${isPlaying ? "animate-[spin_12s_linear_infinite]" : "animate-[spin_24s_linear_infinite] opacity-85"} group-hover/vinyl:animate-[spin_4s_linear_infinite] transition-all`}
                >
                  {/* Vinyl Grooves */}
                  <div className="absolute inset-2 rounded-full border border-zinc-800/40" />
                  <div className="absolute inset-6 rounded-full border border-zinc-800/40" />
                  <div className="absolute inset-10 rounded-full border border-zinc-800/40" />
                  <div className="absolute inset-14 rounded-full border border-zinc-800/40" />

                  {/* Vinyl Label with Album Art */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 border-2 border-zinc-950 flex items-center justify-center overflow-hidden relative shadow-inner">
                    {trackAlbumUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={trackAlbumUrl}
                        alt="Album Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-zinc-950 dark:bg-zinc-50" />
                    )}
                  </div>
                </div>

                {/* Simulated Tonearm (Slightly animated on hover) */}
                <div className="absolute -top-1 -right-1 w-14 h-16 pointer-events-none transform origin-top-left rotate-12 group-hover/vinyl:rotate-[8deg] transition-transform duration-500">
                  <svg
                    viewBox="0 0 40 60"
                    fill="none"
                    className="w-full h-full text-zinc-400 dark:text-zinc-600"
                  >
                    <path
                      d="M5 5 L18 5 L28 40 L25 45"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="5"
                      cy="5"
                      r="4.5"
                      className="fill-zinc-600 dark:fill-zinc-400"
                    />
                    <rect
                      x="22"
                      y="42"
                      width="6"
                      height="10"
                      rx="1.5"
                      className="fill-zinc-800 dark:fill-zinc-300"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Song description */}
            <div className="space-y-4 pt-3 border-t border-zinc-150 dark:border-zinc-800">
              <div className="space-y-1">
                <h4 className="text-sm font-black uppercase tracking-tight truncate">
                  {trackTitle}
                </h4>
                <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider truncate">
                  {trackArtist}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="relative w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className={`absolute left-0 top-0 h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-1000 ease-linear ${isPlaying ? "animate-pulse" : ""}`}
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-bold text-zinc-400 dark:text-zinc-500 font-mono">
                  <span>{formatTime(progressMs)}</span>
                  <span>{formatTime(trackDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        </a>

        {/* ==================== CARD 1: LAGOS STATUS ==================== */}
        <div
          style={{
            zIndex: getCardStyle(1).zIndex,
            transform: getCardStyle(1).transform,
          }}
          className={`${getCardStyle(1).className}`}
          onClick={() => bringToFront(1)}
        >
          {/* Custom designer blueprint/grid lines */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none rounded-lg overflow-hidden">
            <div className="w-full h-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>

          <div className="h-full flex flex-col justify-between relative z-10">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                LAGOS PLANNER
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                02/03
              </span>
            </div>

            {/* Main diary status text */}
            <div className="flex-1 flex flex-col justify-center py-6 space-y-4">
              <p className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed font-serif italic">
                &ldquo;Talk is cheap. Show me the code.&rdquo;
              </p>
              <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mt-1">
                — Linus Torvalds
              </span>

              <div className="space-y-1">
                <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  CURRENT FOCUS
                </span>
                <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Full-Stack Software Engineer
                </span>
              </div>
            </div>

            {/* Footer with clock and availability */}
            <div className="space-y-4 pt-3 border-t border-zinc-150 dark:border-zinc-800">
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    LAGOS TIME
                  </span>
                  <span className="block text-xs font-black tracking-widest text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
                    {isMounted ? time : "00:00:00 AM"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    OPEN FOR CHAT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== CARD 2: RETRO CLI TERMINAL ==================== */}
        <div
          style={{
            zIndex: getCardStyle(2).zIndex,
            transform: getCardStyle(2).transform,
          }}
          className={`${getCardStyle(2).className}`}
          onClick={() => bringToFront(2)}
        >
          <div className="h-full flex flex-col justify-between">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                RETRO CLI TERMINAL
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                03/03
              </span>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 flex flex-col justify-between my-3.5 bg-zinc-950 dark:bg-black rounded-md p-3 border border-zinc-200 dark:border-zinc-850 shadow-inner overflow-hidden min-h-[140px]">
              <div className="space-y-1 font-mono text-[10px] text-emerald-500 dark:text-emerald-400 leading-normal select-text">
                <div className="text-[9px] opacity-40 uppercase tracking-widest border-b border-zinc-900 pb-1 mb-1.5 flex justify-between">
                  <span>host: francis-sys</span>
                  <span>status: online</span>
                </div>
                <div>francis@sys:~$ cat {terminalCommand}</div>

                {/* Dynamically type-written outputs */}
                <div className="space-y-0.5 pt-1">
                  {terminalOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className="transition-opacity duration-150 animate-[fadeIn_0.1s_ease-out]"
                    >
                      {line}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="inline-block w-1.5 h-3.5 bg-emerald-500 dark:bg-emerald-400 animate-pulse ml-0.5 align-middle" />
                  )}
                </div>
              </div>

              {!isTyping && (
                <div className="font-mono text-[9px] text-zinc-650 dark:text-zinc-550 text-right">
                  ready.
                </div>
              )}
            </div>

            {/* Tactical Control Buttons */}
            <div className="space-y-3 pt-3 border-t border-zinc-150 dark:border-zinc-800">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                <span>TERMINAL CONTROL</span>
                <span>CMD INTERACTIVE</span>
              </div>

              {/* Retro command button selectors */}
              <div className="grid grid-cols-3 gap-2">
                {["whoami", "neofetch", "integrity"].map((cmd) => (
                  <button
                    key={cmd}
                    disabled={isTyping}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent shuffling card back when clicking buttons
                      runCommand(cmd);
                    }}
                    className={`text-[9px] font-black uppercase py-1.5 px-1 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-center tracking-wider transition-all cursor-pointer ${
                      terminalCommand === cmd
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-650"
                    }`}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
