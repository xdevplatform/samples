import {
  Client,
  OAuth2,
  generateCodeVerifier,
  generateCodeChallenge,
  type OAuth2Config,
} from '@xdevplatform/xdk';

import * as readlineModule from 'node:readline';

const readline = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Helper function to parse callback
const getQueryStringParams = (callbackInput: string): Record<string, string> => {
  const queryString = callbackInput.includes('?') ? callbackInput.split('?')[1] : callbackInput.replace(/^[?#]/, '');
  return Object.fromEntries(new URLSearchParams(queryString).entries());
};

//Helper terminal input function
async function input(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    readline.question(prompt, (out) => {
      readline.close();
      resolve(out);
    });
  });
}

// The code below sets the client ID and client secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CLIENT_ID='YOUR-CLIENT-ID'
// export CLIENT_SECRET='YOUR-CLIENT-SECRET'
const CLIENT_ID = process.env.CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Include the ID of the Post you wish to bookmark
const tweetId = "post-id"; // Replace with the ID of the Post you wish to bookmark

(async () => {
  try {
    // Configure OAuth 2.0
    const oauth2Config: OAuth2Config = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: 'https://example.com',
      scope: ['tweet.read', 'users.read', 'bookmark.write']
    };

    const oauth2 = new OAuth2(oauth2Config);

    // Generate PKCE parameters
    const STATE = "my-state";
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    oauth2.setPkceParameters(codeVerifier, codeChallenge);
    
    // Get authorization URL
    const authUrl = await oauth2.getAuthorizationUrl(STATE);
    console.log(`Please go here and authorize:`, authUrl);

    //Input users callback url in terminal
    const redirectCallback = await input("Paste the redirected callback here: ");

    //Parse callback
    const { state, code } = getQueryStringParams(redirectCallback);
    if (state !== STATE) {
      console.log("State isn't matching");
      process.exit(-1);
    }

    // Exchange code for tokens
    const tokens = await oauth2.exchangeCode(code, codeVerifier);

    // Create client with access token
    const client = new Client({
      accessToken: tokens.access_token
    });

    //Get the user ID
    const meResponse = await client.users.getMe();
    const userId = meResponse.data?.id;

    if (!userId) {
      throw new Error('Could not get user ID');
    }

    //Makes api call
    const postBookmark = await client.users.createBookmark(userId, { tweetId });
    console.dir(postBookmark, {
      depth: null,
    });
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
})();
