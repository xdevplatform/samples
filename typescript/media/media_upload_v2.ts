/**
 * Media Upload v2 (Chunked Video Upload) - X API v2
 *
 * Endpoint: POST https://api.x.com/2/media/upload/initialize | append | finalize
 * Docs: https://developer.x.com/en/docs/twitter-api/media/upload-media/api-reference
 *
 * Authentication: OAuth 2.0 PKCE (User Context)
 * Required env vars: CLIENT_ID, CLIENT_SECRET (or ACCESS_TOKEN)
 */

import * as fs from 'node:fs';
import * as readline from 'node:readline';
import {
  Client,
  OAuth2,
  generateCodeVerifier,
  generateCodeChallenge,
} from '@xdevplatform/xdk';

function promptLine(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function extractCode(callbackInput: string): string {
  const trimmed = callbackInput.trim();
  if (!trimmed.includes('://') && !trimmed.includes('code=')) {
    return trimmed;
  }
  const url = trimmed.includes('://') ? new URL(trimmed) : new URL(`https://example.com?${trimmed}`);
  const code = url.searchParams.get('code');
  if (!code) {
    throw new Error("No 'code' query parameter found in callback URL");
  }
  return code;
}

async function createUserClient(scopes: string[]): Promise<Client> {
  if (process.env.ACCESS_TOKEN) {
    return new Client({ accessToken: process.env.ACCESS_TOKEN });
  }
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  if (!clientId) {
    throw new Error('Set CLIENT_ID (and optionally CLIENT_SECRET) or ACCESS_TOKEN');
  }
  const oauth2 = new OAuth2({
    clientId,
    clientSecret,
    redirectUri: process.env.REDIRECT_URI || 'https://example.com',
    scope: scopes,
  });
  const state = 'sample-state';
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  oauth2.setPkceParameters(codeVerifier, codeChallenge);

  const authUrl = await oauth2.getAuthorizationUrl(state);
  console.log('Visit the following URL to authorize your App:', authUrl);
  const callbackUrl = await promptLine('Paste the redirected callback URL here: ');
  const tokens = await oauth2.exchangeCode(extractCode(callbackUrl), codeVerifier);
  return new Client({ accessToken: tokens.access_token });
}

(async () => {
  const client = await createUserClient(['media.write', 'users.read', 'tweet.read', 'tweet.write', 'offline.access']);
  const videoPath = process.env.VIDEO_FILE || 'path/to/your/video.mp4';
  const allBytes = fs.readFileSync(videoPath);

  // 1. Initialize chunked upload
  const initRes = await client.media.initializeUpload({
    mediaType: 'video/mp4',
    mediaCategory: 'tweet_video',
    totalBytes: allBytes.length,
  });
  const mediaId = initRes.data?.id;
  if (!mediaId) {
    throw new Error('Media upload initialization did not return a media ID');
  }
  console.log('Initialized upload for mediaId:', mediaId);

  // 2. Append 4 MiB chunks
  const chunkSize = 4 * 1024 * 1024;
  let segmentIndex = 0;
  for (let offset = 0; offset < allBytes.length; offset += chunkSize) {
    const chunk = allBytes.subarray(offset, Math.min(offset + chunkSize, allBytes.length));
    await client.media.appendUpload(mediaId, {
      segmentIndex: segmentIndex++,
      media: chunk.toString('base64'),
    });
    console.log(`Uploaded ${Math.min(offset + chunkSize, allBytes.length)} / ${allBytes.length} bytes`);
  }

  // 3. Finalize & poll processing status
  const finRes = await client.media.finalizeUpload(mediaId);
  let proc: any = finRes.data?.processingInfo;
  while (proc && proc.state && proc.state !== 'succeeded' && proc.state !== 'failed') {
    const waitSecs: number = proc.checkAfterSecs ?? proc.check_after_secs ?? 2;
    await new Promise((r) => setTimeout(r, waitSecs * 1000));
    const statusRes = await client.media.getUploadStatus(mediaId, { command: 'STATUS' });
    proc = statusRes.data?.processingInfo;
  }

  // 4. Create post with attached video
  const postRes = await client.posts.create({
    text: 'Uploaded a video using @xdevplatform/xdk!',
    media: { mediaIds: [mediaId] },
  });
  console.dir(postRes, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
