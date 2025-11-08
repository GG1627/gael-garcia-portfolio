import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`/?error=${error}`);
  }

  if (!code) {
    // If accessed directly without OAuth flow, redirect to home
    return NextResponse.redirect('/');
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback';

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Spotify credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      const html = `
        <html>
          <head><title>Spotify Auth Error</title></head>
          <body style="font-family: monospace; padding: 40px; max-width: 800px; margin: 0 auto;">
            <h1 style="color: red;">❌ Error getting token</h1>
            <pre style="background: #f0f0f0; padding: 20px; border-radius: 8px; overflow: auto;">${JSON.stringify(errorData, null, 2)}</pre>
            <p><a href="/api/spotify/auth">Try again</a></p>
          </body>
        </html>
      `;
      return new NextResponse(html, {
        status: 500,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const tokenData = await tokenResponse.json();
    
    // Display the refresh token - copy this to your .env.local file!
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Token</title>
          <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; background: #f5f5f5;">
          <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #1DB954; margin-top: 0;">✅ Success! Copy your refresh token:</h1>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #1DB954;">
              <code style="font-size: 14px; word-break: break-all; color: #333;">${tokenData.refresh_token}</code>
            </div>
            <p style="font-weight: 600; margin-top: 30px;">Add this to your <code style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px;">.env.local</code> file:</p>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1DB954;">
              <code style="font-size: 14px; color: #333;">SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}</code>
            </div>
            <p style="color: #666; margin-top: 30px;">⚠️ <strong>Important:</strong> Copy this token now - you won't be able to see it again!</p>
            <p style="color: #666;">After adding it to your .env.local file, restart your dev server.</p>
            <p style="margin-top: 30px;"><a href="/" style="color: #1DB954; text-decoration: none; font-weight: 600;">← Back to portfolio</a></p>
          </div>
        </body>
      </html>
    `;
    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    const html = `
      <html>
        <head><title>Spotify Auth Error</title></head>
        <body style="font-family: monospace; padding: 40px; max-width: 800px; margin: 0 auto;">
          <h1 style="color: red;">❌ Error</h1>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p><a href="/api/spotify/auth">Try again</a></p>
        </body>
      </html>
    `;
    return new NextResponse(html, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

