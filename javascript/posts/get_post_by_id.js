/**
 * Single Post Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/:id
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

const { Client } = require('@xdevplatform/xdk');

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const postId = 'post-id';
  const response = await client.posts.getById(postId, {
    tweetFields: ['created_at', 'author_id', 'lang', 'source', 'public_metrics', 'entities'],
  });
  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
