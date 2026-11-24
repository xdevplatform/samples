/**
 * Get User Conversation Events - X API v2
 *
 * Endpoint: GET https://api.x.com/2/dm_events
 * Docs: https://developer.x.com/en/docs/twitter-api/direct-messages/lookup/api-reference/get-dm-events
 *
 * Authentication: OAuth 2.0 PKCE (User Context)
 * Required env vars: CLIENT_ID, CLIENT_SECRET (or ACCESS_TOKEN)
 */

const {
  Client,
  OAuth2,
  generateCodeVerifier,
  generateCodeChallenge,
  EventPaginator,
  PostPaginator,
  UserPaginator,
} = require('@xdevplatform/xdk');

function promptLine(question) {
  const rl = require('readline').createInterface({
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

function extractCode(callbackInput) {
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

async function createUserClient(scopes) {
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
  const client = await createUserClient(['dm.read', 'tweet.read', 'users.read', 'offline.access']);

  const paginator = new EventPaginator(async (token) => {
    const res = await client.directMessages.getEvents({
      maxResults: 100,
      paginationToken: token,
      dmEventFields: ['id', 'text', 'event_type', 'created_at', 'sender_id'],
    });
    return {
      data: res.data ?? [],
      meta: res.meta,
      includes: res.includes,
      errors: res.errors,
    };
  });

  for await (const event of paginator) {
    console.dir(event, { depth: null });
  }
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
