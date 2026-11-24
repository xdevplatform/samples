// Get Reposted By (Users who reposted) by Post ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/retweets/api-reference/get-tweets-id-retweeted_by

import { Client, UserPaginator } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: bearerToken });

// You can replace the ID given with the Post ID you wish to lookup reposting users for
// You can find an ID by using the Post lookup endpoint
const postId = "1980412193624785337";

const getRepostedBy = async () => {
    console.log("Retrieving users who reposted...");
    
    // Use paginator for automatic pagination
    const repostedBy = new UserPaginator(
        async (token?: string) => {
            const res = await client.posts.getRepostedBy(postId, {
                maxResults: 100,
                paginationToken: token,
                tweetFields: ['lang', 'author_id'],
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
    await repostedBy.fetchNext();
    while (!repostedBy.done) {
        await repostedBy.fetchNext();
    }

    console.dir(repostedBy.users, {
        depth: null
    });

    console.log(`Got ${repostedBy.users.length} users who reposted Post ID ${postId}!`);
}

getRepostedBy().catch(err => {
    console.error('Error:', err);
    process.exit(-1);
});

