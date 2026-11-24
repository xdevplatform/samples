/**
 * Post Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/posts
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// These are the parameters for the API request
// specify Post IDs to fetch, and any additional fields that are required
// by default, only the Post ID and text are returned
const postIDs = ['1278747501642657792', '1275828087666679809']; // Edit the Post IDs to look up


(async () => {
    try {
        // Post IDs to look up (comma-separated, up to 100)
        const response = await client.posts.getByIds(postIDs, {
            tweetFields: ['created_at', 'author_id', 'lang', 'source', 'public_metrics'],
            userFields: ['created_at'],
            expansions: ['author_id']
        });
        
        console.dir(response, { depth: null });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
