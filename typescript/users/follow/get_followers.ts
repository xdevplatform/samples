// Fetch the followers of a user account, by ID
// https://developer.twitter.com/en/docs/twitter-api/users/follows/quick-start

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
