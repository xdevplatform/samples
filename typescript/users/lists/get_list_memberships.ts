import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });
const id = "user-id";

(async () => {
  try {
    // These are the parameters for the API request
    // by default, only the List ID and name are returned
    const response = await client.users.getListMemberships(id, {
      listFields: ['created_at', 'description', 'follower_count'], // Edit optional query parameters here
      expansions: ['owner_id'], // expansions is used to include the user object
      userFields: ['created_at', 'verified'] // Edit optional query parameters here
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
