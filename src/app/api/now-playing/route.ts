import { NextResponse } from "next/server";
import { getSpotifyStatus } from "@/lib/spotify";

export async function GET() {
  const status = await getSpotifyStatus();

  // If status is null (credentials not configured or API fetch fails), 
  // return the premium placeholder track so the UI is always perfectly populated.
  if (!status) {
    return NextResponse.json({
      isPlaying: false,
      title: "After Hours (Lofi Cut)",
      artist: "Selected Chill Beats",
      album: "Chill Lofi Beats Vol. 1",
      albumImageUrl: "",
      songUrl: "https://open.spotify.com",
      progressMs: 134000,
      durationMs: 225000,
      isFallback: true,
    });
  }

  // Cache response for 10 seconds with stale-while-revalidate for 5 seconds.
  // This keeps the page fast and limits hitting Spotify's rate limits.
  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=5",
    },
  });
}
