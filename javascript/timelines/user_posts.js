/**
 * User Posts Timeline - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/:id/tweets
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;

// Replace with the user ID you want to get posts for
const userId = "2244994945";
const endpointURL = `https://api.x.com/2/users/${userId}/tweets`;

async function getRequest() {
    const params = {
        "tweet.fields": "created_at,public_metrics",
        "max_results": 10
    };

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserPostsJS",
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
