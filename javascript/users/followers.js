/**
 * User Followers Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/:id/followers
 * Docs: https://developer.x.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-followers
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;

// Replace with the user ID you want to get followers for
const userId = "2244994945";
const endpointURL = `https://api.x.com/2/users/${userId}/followers`;

async function getRequest() {
    const params = {
        "user.fields": "created_at,description",
        "max_results": 100
    };

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2FollowersJS",
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
