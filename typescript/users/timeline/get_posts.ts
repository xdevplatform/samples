/**
 * User Posts Timeline - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/:id/posts
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 * 
 * This is a simple example that makes a single request.
 * For automatic pagination, see user_posts_paginated.js
 */

import { Client } from '@xdevplatform/xdk';

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// Replace with the user ID you want to get posts for
const userId = "2244994945";

(async () => {
    try {
        const response = await client.users.getPosts(userId, {
            tweetFields: ['created_at', 'public_metrics'],
            maxResults: 10
        });
        
        console.dir(response, { depth: null });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
