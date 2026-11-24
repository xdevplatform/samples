// Get Posts Usage
// https://developer.twitter.com/en/docs/twitter-api/usage/tweets

import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

(async () => {
    try {
        // Make request
        const response = await client.usage.get();
        
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();

