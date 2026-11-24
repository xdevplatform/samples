/**
 * Spaces Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/spaces
 * Docs: https://developer.x.com/en/docs/twitter-api/spaces/lookup/api-reference/get-spaces
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 */

const { Client } = require('@xdevplatform/xdk');

const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

const spaceIds = ['1DXxyRYNejbKM'];

(async () => {
    try {
        // Replace with Space IDs you want to look up
        const response = await client.spaces.getByIds(spaceIds, {
            spaceFields: ['created_at', 'participant_count', 'title', 'state'],
            expansions: ['creator_id', 'host_ids']
        });
        
        console.dir(response, { depth: null });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
