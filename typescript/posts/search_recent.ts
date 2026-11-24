/**
 * Recent Search - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/posts/search/recent
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
 * 
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 * 
 * Note: Returns posts from the last 7 days.
 * This example demonstrates automatic pagination using PostPaginator
 * to fetch all pages of results.
 */

import { Client, PostPaginator } from '@xdevplatform/xdk';

const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

const query = 'from:x -is:retweet';

const searchRecent = async () => {
    console.log("Searching recent posts...");
    
    // Use paginator for automatic pagination
    const searchResults = new PostPaginator(
        async (token?: string) => {
            const res = await client.posts.searchRecent(query, {
                maxResults: 100,
                nextToken: token,
                tweetFields: ['author_id', 'created_at']
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
    await searchResults.fetchNext();
    while (!searchResults.done) {
        await searchResults.fetchNext();
    }

    console.dir(searchResults.posts, {
        depth: null
    });

    console.log(`Got ${searchResults.posts.length} posts for query: ${query}`);
}

searchRecent().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});
