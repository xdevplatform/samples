/**
 * Recent Search - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/tweets/search/recent
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
 * 
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 * 
 * Note: Returns posts from the last 7 days.
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;
const endpointUrl = "https://api.x.com/2/tweets/search/recent";

async function getRequest() {
    // Edit query parameters below
    // By default, only the post ID and text fields are returned
    const params = {
        'query': 'from:XDevelopers -is:retweet',
        'tweet.fields': 'author_id,created_at'
    };

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
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
