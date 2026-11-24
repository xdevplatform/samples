/**
 * User Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/by
 * Docs: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

const usernames = ['XDevelopers', 'X'];
(async () => {
    try {
        // Usernames to look up (up to 100)
        const response = await client.users.getByUsernames(usernames, {
            userFields: ['created_at', 'description', 'public_metrics'],
            expansions: ['pinned_post_id']
        });
        
        console.dir(response, { depth: null });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
