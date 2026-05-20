import dotenv from 'dotenv';
dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
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
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh access token: ${response.statusText}`);
  }

  return response.json();
}

async function run() {
  console.log('Testing Spotify connection with your new keys...');
  console.log(`SPOTIFY_CLIENT_ID: ${client_id ? '✓ Configured' : '✗ Missing'}`);
  console.log(`SPOTIFY_CLIENT_SECRET: ${client_secret ? '✓ Configured' : '✗ Missing'}`);
  console.log(`SPOTIFY_REFRESH_TOKEN: ${refresh_token ? '✓ Configured' : '✗ Missing'}`);

  if (!client_id || !client_secret || !refresh_token) {
    console.error('Missing credentials. Please check your .env file.');
    return;
  }

  try {
    const { access_token } = await getAccessToken();
    console.log('Token Refresh: SUCCESS! 🔑');

    // 1. Try currently playing
    const curRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (curRes.status === 200) {
      const data = await curRes.json();
      console.log('\n--- Live Now Playing ---');
      console.log('Status: ACTIVE PLAYBACK 🎉');
      console.log(`Title:  ${data.item.name}`);
      console.log(`Artist: ${data.item.artists.map(a => a.name).join(', ')}`);
      console.log(`Album:  ${data.item.album.name}`);
      return;
    }

    // 2. Fallback to recently played
    console.log('\nNothing is playing right now. Fetching recently played fallback...');
    const recRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (recRes.status === 200) {
      const data = await recRes.json();
      if (data.items && data.items.length > 0) {
        const track = data.items[0].track;
        console.log('\n--- Recently Played Track ---');
        console.log('Status: IDLE (Showing Fallback) 📻');
        console.log(`Title:  ${track.name}`);
        console.log(`Artist: ${track.artists.map(a => a.name).join(', ')}`);
        console.log(`Album:  ${track.album.name}`);
      } else {
        console.log('No recently played tracks found.');
      }
    } else {
      console.log(`Failed to fetch recently played: ${recRes.statusText} (${recRes.status})`);
    }
  } catch (err) {
    console.error('\nError during test:', err.message || err);
  }
}

run();
