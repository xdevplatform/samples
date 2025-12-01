/**
 * Post Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/tweets
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.x.com/2/tweets";

async function getRequest() {
    // Post IDs to look up (comma-separated, up to 100)
    const params = {
        "ids": "1278747501642657792,1255542774432063488",
        "tweet.fields": "created_at,author_id,lang,source,public_metrics",
        "expansions": "author_id"
    };

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2PostLookupJS",
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
