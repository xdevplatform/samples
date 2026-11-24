// Update the metadata of an existing list the authenticated user owns - using OAuth 2.0 to authorize the user
// https://developer.twitter.com/en/docs/twitter-api/lists/manage-lists/quick-start
const { 
  Client, 
  OAuth2,
  generateCodeVerifier,
  generateCodeChallenge
} = require('@xdevplatform/xdk');

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The code below sets the client ID and client secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CLIENT_ID='YOUR-CLIENT-ID'
// export CLIENT_SECRET='YOUR-CLIENT-SECRET'
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Be sure to add replace update-name-of-list with the name you wish to call the list.
// name, description and private are all optional
const data = {
  name: "update-name-of-list",
  description: "update-description-of-list",
  private: false,
};

// Be sure to add replace the your-list-id with the list id of the list you wish to update.
const targetListId = "your-list-id";

async function input(prompt) {
  return new Promise((resolve) => {
    readline.question(prompt, (out) => {
      readline.close();
      resolve(out);
    });
  });
}

// Helper function to parse callback URL
const getQueryStringParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split(/[\?\&]/)
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return params;
        }, {})
    : {};
};

(async () => {
  try {
    // Configure OAuth 2.0
    const oauth2Config = {
      clientId: clientId,
      clientSecret: clientSecret,
      redirectUri: 'https://example.com',
      scope: ['tweet.read', 'users.read', 'list.read', 'list.write', 'offline.access']
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

    // Make the request using SDK
    const response = await client.lists.update(targetListId, data);
    console.dir(response, {
      depth: null,
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
