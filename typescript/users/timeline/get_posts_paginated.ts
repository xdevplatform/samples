/**
 * User Posts Timeline (Paginated) - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/:id/posts
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
 * 
 * Authentication: Bearer Token (App-only) or OAuth (User Context)
 * Required env vars: BEARER_TOKEN
 * 
 * This example demonstrates automatic pagination using PostPaginator
 * to fetch all pages of results. For a simple single-request example,
 * see user_posts.js
 */

import { Client, PostPaginator } from '@xdevplatform/xdk';

// this is the ID for @TwitterDev
const userId = "2244994945";

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

const getUserTweets = async () => {
    console.log("Retrieving Tweets...");

    // Use paginator for automatic pagination
    // we request the author_id expansion so that we can print out the user name later
    const userTweets = new PostPaginator(
        async (token?: string) => {
            const res = await client.users.getPosts(userId, {
                maxResults: 100,
                paginationToken: token,
                tweetFields: ['created_at'],
                expansions: ['author_id']
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
    await userTweets.fetchNext();
    while (!userTweets.done) {
        await userTweets.fetchNext();
    }

    let userName;
    if (userTweets.includes?.users && userTweets.includes.users.length > 0) {
        userName = userTweets.includes.users[0].username;
    }

    console.dir(userTweets.posts, {
        depth: null
    });
    console.log(`Got ${userTweets.posts.length} Tweets from ${userName || 'user'} (user ID ${userId})!`);
}

getUserTweets().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});

