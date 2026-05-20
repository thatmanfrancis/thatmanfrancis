import http from 'http';
import { exec } from 'child_process';
import readline from 'readline';

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log('\n=== Spotify OAuth Setup Helper ===\n');
  console.log('To connect your website to your live Spotify playback:');
  console.log('1. Go to https://developer.spotify.com/dashboard');
  console.log('2. Create an App (e.g. "Francis Portfolio")');
  console.log(`3. Edit App settings and add Redirect URI: ${REDIRECT_URI}`);
  console.log('4. Copy the Client ID and Client Secret.\n');

  const clientId = (await ask('Enter your Spotify Client ID: ')).trim();
  const clientSecret = (await ask('Enter your Spotify Client Secret: ')).trim();

  if (!clientId || !clientSecret) {
    console.error('Error: Both Client ID and Client Secret are required.');
    rl.close();
    process.exit(1);
  }

  // Construct Auth URL
  const scopes = 'user-read-currently-playing user-read-recently-played';
  const authUrl = `https://accounts.spotify.com/authorize?` + new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: scopes,
  }).toString();

  console.log('\n--- Step 2: Authorize Application ---');
  console.log('We will now launch a temporary local server to capture the Spotify callback.');
  console.log('Please open this URL in your browser:\n');
  console.log(`\x1b[36m${authUrl}\x1b[0m\n`);

  // Attempt to open browser automatically
  try {
    const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    // Escape ampersands for Windows CMD/PowerShell if opening directly
    const escapedUrl = process.platform === 'win32' ? authUrl.replace(/&/g, '^&') : authUrl;
    exec(`${startCmd} "${escapedUrl}"`);
  } catch {
    // Fail silently, they can click the link manually
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing code parameter.');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding-top: 50px; background: #121212; color: #ffffff;">
            <h1 style="color: #1DB954;">Success!</h1>
            <p>Spotify authorized successfully. You can close this tab and return to the terminal.</p>
          </body>
        </html>
      `);

      // Exchange code for tokens
      try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
          }),
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
          console.error('\nError exchanging code for token:', tokenData.error_description || tokenData.error);
        } else {
          console.log('\n\x1b[32m=== SUCCESS! Copy these lines to your .env file ===\x1b[0m\n');
          console.log(`SPOTIFY_CLIENT_ID="${clientId}"`);
          console.log(`SPOTIFY_CLIENT_SECRET="${clientSecret}"`);
          console.log(`SPOTIFY_REFRESH_TOKEN="${tokenData.refresh_token}"\n`);
          console.log('====================================================\n');
        }
      } catch (err) {
        console.error('Error fetching token:', err);
      } finally {
        rl.close();
        server.close();
        process.exit(0);
      }
    }
  });

  server.listen(PORT, () => {
    console.log(`Waiting for authorization at ${REDIRECT_URI}...`);
  });
}

main().catch(console.error);
