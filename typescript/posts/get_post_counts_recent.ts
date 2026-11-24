// Search for posts within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

(async () => {
    try {
        // Edit query parameters below and specify a search query
        // optional params: start_time,end_time,since_id,until_id,next_token,granularity
        const response = await client.posts.getCountsRecent('from:xdevelopers', {
            granularity: 'day'
        });
        
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();

