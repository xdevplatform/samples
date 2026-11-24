// Search for public posts across the whole Twitter archive
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/full-archive-search

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
        const response = await client.posts.getCountsAll('from:xdevelopers', {
            granularity: 'day',
            startTime: '2021-01-01T00:00:00Z'
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