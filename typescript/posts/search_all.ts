// Search for public posts across the whole Twitter archive
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/full-archive-search

import { Client, PostPaginator } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

const query = 'from:xdevelopers';

const searchAll = async () => {
    console.log("Searching full archive...");
    
    // Use paginator for automatic pagination
    const searchResults = new PostPaginator(
        async (token?: string) => {
            const res = await client.posts.searchAll(query, {
                maxResults: 100,
                nextToken: token,
                tweetFields: ['author_id']
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

searchAll().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});
