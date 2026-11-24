/**
 * User Following Lookup (Paginated) - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/:id/following
 * Docs: https://developer.x.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-following
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 * 
 * This example demonstrates automatic pagination using UserPaginator
 * to fetch all pages of results.
 */

import { Client, UserPaginator } from '@xdevplatform/xdk';

// this is the ID for @XDevelopers
const userId = '2244994945';
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

const getFollowing = async () => {
    console.log("Retrieving users this user is following...");

    // Use paginator for automatic pagination
    const following = new UserPaginator(
        async (token?: string) => {
            const res = await client.users.getFollowing(userId, {
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
    await following.fetchNext();
    while (!following.done) {
        await following.fetchNext();
    }

    console.log(following.users);
    console.log(`Got ${following.users.length} users.`);
}

getFollowing().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});

