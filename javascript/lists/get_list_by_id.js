/**
 * List Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/lists/:id
 * Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const { Client } = require('@xdevplatform/xdk');

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// Replace with the list ID you want to look up
const listId = "84839422";

(async () => {
    try {
        const response = await client.lists.getById(listId, {
            listFields: ['created_at', 'follower_count', 'member_count', 'description'],
            expansions: ['owner_id']
        });
        
        console.dir(response, { depth: null });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
