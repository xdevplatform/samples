// Lookup Spaces by ID
// https://developer.twitter.com/en/docs/twitter-api/spaces/lookup

import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

const query = 'NBA';

(async () => {
    try {
        // Edit query parameters below and specify a search query
        // optional params: host_ids,conversation_controls,created_at,creator_id,id,invited_user_ids,is_ticketed,lang,media_key,participants,scheduled_start,speaker_ids,started_at,state,title,updated_at
        const response = await client.spaces.search(query, {
            spaceFields: ['title', 'created_at'],
            expansions: ['creator_id']
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
