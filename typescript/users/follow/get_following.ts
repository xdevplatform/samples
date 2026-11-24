/**
 * User Following Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/users/:id/following
 * Docs: https://developer.x.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-following
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const userId = '2244994945';
  const response = await client.users.getFollowing(userId, {
    maxResults: 100,
    userFields: ['created_at'],
  });
  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
