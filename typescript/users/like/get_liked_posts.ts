// Get Liked Posts by User ID using OAuth 2.0 to authorize the user
// https://developer.twitter.com/en/docs/twitter-api/tweets/likes/api-reference/get-users-id-liked_tweets

import {
  Client,
  OAuth2,
  PostPaginator,
  generateCodeVerifier,
  generateCodeChallenge,
  type OAuth2Config,
} from '@xdevplatform/xdk';

import * as readlineModule from 'node:readline';

const readline = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The code below sets the client ID and client secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CLIENT_ID='YOUR-CLIENT-ID'
// export CLIENT_SECRET='YOUR-CLIENT-SECRET'
const clientId = process.env.CLIENT_ID ?? '';
const clientSecret = process.env.CLIENT_SECRET;

// You can replace the ID given with the User ID you wish to get liked posts for.
// You can find a user ID by using the user lookup endpoint
const userId = "your-user-id";

async function input(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    readline.question(prompt, (out) => {
      readline.close();
      resolve(out);
    });
  });
}

// Helper function to parse callback URL
const getQueryStringParams = (callbackInput: string): Record<string, string> => {
  const queryString = callbackInput.includes('?') ? callbackInput.split('?')[1] : callbackInput.replace(/^[?#]/, '');
  return Object.fromEntries(new URLSearchParams(queryString).entries());
};

(async () => {
  try {
    // Configure OAuth 2.0
    const oauth2Config: OAuth2Config = {
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: 'https://example.com',
      scope: ['tweet.read', 'users.read', 'like.read', 'offline.access']
    };

    const oauth2 = new OAuth2(oauth2Config);

    // Generate PKCE parameters
    const state = 'example-state';
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    oauth2.setPkceParameters(codeVerifier, codeChallenge);
    
    // Get authorization URL
    const authUrl = await oauth2.getAuthorizationUrl(state);
    console.log("Please go here and authorize:", authUrl);

    // Input callback URL from terminal
    const redirectCallback = await input("Paste the redirected callback URL here: ");

    // Parse callback
    const { state: returnedState, code } = getQueryStringParams(redirectCallback);
    if (returnedState !== state) {
      console.log("State doesn't match");
      process.exit(-1);
    }

    // Exchange code for tokens
    const tokens = await oauth2.exchangeCode(code, codeVerifier);

    // Create client with access token
    const client = new Client({
      accessToken: tokens.access_token
    });

    console.log("Retrieving liked posts...");
    
    // Use paginator for automatic pagination
    const likedPosts = new PostPaginator(
        async (token?: string) => {
            const res = await client.users.getLikedPosts(userId, {
                maxResults: 100,
                paginationToken: token,
                tweetFields: ['lang', 'author_id'],
                userFields: ['created_at']
            });
            return {
                data: res.data ?? [],
                meta: res.meta,
                includes: res.includes,
                errors: res.errors
            };
        }
    );

    // Fetch all pages
    await likedPosts.fetchNext();
    while (!likedPosts.done) {
        await likedPosts.fetchNext();
    }

    console.dir(likedPosts.posts, {
        depth: null
    });

    console.log(`Got ${likedPosts.posts.length} liked posts for user ID ${userId}!`);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();

