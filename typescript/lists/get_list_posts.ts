import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });
const id = "list-id";

(async () => {
  try {
    // These are the parameters for the API request
    // by default, only the Post ID and text are returned
    const response = await client.lists.getPosts(id, {
      tweetFields: ['lang', 'author_id'], // Edit optional query parameters here
      expansions: ['author_id'], // expansions is used to include the user object
      userFields: ['created_at'] // Edit optional query parameters here
    });
    
    console.dir(response, {
      depth: null,
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();

