/**
 * List Activity Subscriptions - X API v2
 *
 * Endpoint: GET https://api.x.com/2/activity/subscriptions
 * Docs: https://docs.x.com/x-api/activity/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

const { Client } = require('@xdevplatform/xdk');

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const response = await client.activity.getSubscriptions();
  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
