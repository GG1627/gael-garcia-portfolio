import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:3000/api/spotify/callback';
  
  if (!clientId) {
    return NextResponse.json(
      { error: 'SPOTIFY_CLIENT_ID not configured' },
      { status: 500 }
    );
  }

  const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
  ].join(' ');

  const authUrl = `https://accounts.spotify.com/authorize?` +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scopes)}`;

  return NextResponse.redirect(authUrl);
}

