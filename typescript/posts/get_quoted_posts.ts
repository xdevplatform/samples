// Get Quote Posts by Post ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/quote-tweets-lookup/quick-start

import { Client, PostPaginator } from '@xdevplatform/xdk';

const postId = '1980412193624785337';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

const getQuotePosts = async () => {
    console.log("Retrieving quote posts...");
    
    // Use paginator for automatic pagination
    const quotePosts = new PostPaginator(
        async (token?: string) => {
            const res = await client.posts.getQuoted(postId, {
                maxResults: 100,
                paginationToken: token,
                tweetFields: ['created_at']
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
    await quotePosts.fetchNext();
    while (!quotePosts.done) {
        await quotePosts.fetchNext();
    }

    console.dir(quotePosts.posts, {
        depth: null
    });

    console.log(`Got ${quotePosts.posts.length} quote posts for Post ID ${postId}!`);
}

getQuotePosts().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});

