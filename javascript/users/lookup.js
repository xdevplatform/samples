/**
 * User Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/by
 * Docs: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.x.com/2/users/by";

async function getRequest() {
    // Usernames to look up (up to 100 comma-separated)
    const params = {
        "usernames": "XDevelopers,X",
        "user.fields": "created_at,description,public_metrics"
    };

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
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
