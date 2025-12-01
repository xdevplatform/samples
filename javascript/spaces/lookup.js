/**
 * Spaces Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/spaces
 * Docs: https://developer.x.com/en/docs/twitter-api/spaces/lookup/api-reference/get-spaces
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;
const endpointURL = "https://api.x.com/2/spaces";

async function getRequest() {
    const params = {
        "ids": "1DXxyRYNejbKM",
        "space.fields": "host_ids,created_at,creator_id,participant_count,title,state"
    };

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2SpacesLookupJS",
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
