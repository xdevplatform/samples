// Get User mentions timeline by user ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start

import { Client, PostPaginator } from '@xdevplatform/xdk';

const userId = '2244994945';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

// this is the ID for @TwitterDev
const getUserMentions = async () => {
    console.log("Retrieving mentions...");

    // Use paginator for automatic pagination
    const userMentions = new PostPaginator(
        async (token?: string) => {
            const res = await client.users.getMentions(userId, {
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
    await userMentions.fetchNext();
    while (!userMentions.done) {
        await userMentions.fetchNext();
    }

    console.dir(userMentions.posts, {
        depth: null
    });

    console.log(`Got ${userMentions.posts.length} mentions for user ID ${userId}!`);
}

getUserMentions().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});
