/**
 * List Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/lists/:id
 * Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;

// Replace with the list ID you want to look up
const listId = "84839422";
const endpointURL = `https://api.x.com/2/lists/${listId}`;

async function getRequest() {
    const params = {
        "list.fields": "created_at,follower_count,member_count,owner_id,description"
    };

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2ListLookupJS",
            "authorization": `Bearer ${token}`
        }
    });

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {
    try {
        const response = await getRequest();
        console.dir(response, { depth: null });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
