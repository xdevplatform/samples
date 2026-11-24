/**
 * User Followers Lookup (Paginated) - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/:id/followers
 * Docs: https://developer.x.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-followers
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 * 
 * This example demonstrates automatic pagination using UserPaginator
 * to fetch all pages of results. For a simple single-request example,
 * see get_followers.ts
 */

import { Client, UserPaginator } from '@xdevplatform/xdk';

// this is the ID for @XDevelopers
const userId = '2244994945';
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

const getFollowers = async () => {
    console.log("Retrieving followers...");
    
    // Use paginator for automatic pagination
    const followers = new UserPaginator(
        async (token?: string) => {
            const res = await client.users.getFollowers(userId, {
                maxResults: 1000,
                paginationToken: token,
                userFields: ['created_at']
            });
            return {
                data: res.data ?? [],
                meta: res.meta,
                includes: res.includes,
                errors: res.errors
            };
        }
    );

    // Fetch all pages
    await followers.fetchNext();
    while (!followers.done) {
        await followers.fetchNext();
    }

    console.log(followers.users);
    console.log(`Got ${followers.users.length} users.`);
}

getFollowers().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});

