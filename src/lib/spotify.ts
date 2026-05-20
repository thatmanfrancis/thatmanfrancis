const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = typeof window === "undefined" 
  ? Buffer.from(`${client_id}:${client_secret}`).toString("base64")
  : "";

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error("Missing Spotify credentials in environment variables");
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    next: {
      revalidate: 0, // Ensure we don't cache token fetches internally in Next.js
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh access token: ${response.statusText}`);
  }

  return response.json();
}

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  progressMs: number;
  durationMs: number;
}

export async function getSpotifyStatus(): Promise<SpotifyTrack | null> {
  // If not configured, gracefully return null so route handler falls back to static content
  if (!client_id || !client_secret || !refresh_token) {
    return null;
  }

  try {
    const { access_token } = await getAccessToken();

    // 1. Try to get currently playing song
    const currentlyPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 0,
      },
    });

    if (currentlyPlayingResponse.status === 204 || currentlyPlayingResponse.status > 400) {
      // 204 means nothing is currently playing. Fallback to recently played track.
      return getRecentlyPlayedTrack(access_token);
    }

    const data = await currentlyPlayingResponse.json();
    if (!data.item) {
      return getRecentlyPlayedTrack(access_token);
    }

    const track = data.item;
    return {
      isPlaying: data.is_playing,
      title: track.name,
      artist: track.artists.map((_artist: { name: string }) => _artist.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images[0]?.url || "",
      songUrl: track.external_urls.spotify,
      progressMs: data.progress_ms || 0,
      durationMs: track.duration_ms || 0,
    };
  } catch (error) {
    console.error("Error in getSpotifyStatus:", error);
    return null;
  }
}

async function getRecentlyPlayedTrack(accessToken: string): Promise<SpotifyTrack | null> {
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 0,
      },
    });

    if (!response.ok || response.status === 204) {
      return null;
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return null;
    }

    const track = data.items[0].track;
    return {
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((_artist: { name: string }) => _artist.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images[0]?.url || "",
      songUrl: track.external_urls.spotify,
      progressMs: 0,
      durationMs: track.duration_ms || 0,
    };
  } catch (error) {
    console.error("Error fetching recently played from Spotify:", error);
    return null;
  }
}
