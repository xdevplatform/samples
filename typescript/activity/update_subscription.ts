/**
 * Update Activity Subscription - X API v2
 *
 * Endpoint: PUT https://api.x.com/2/activity/subscriptions/:id
 * Docs: https://docs.x.com/x-api/activity/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const subscriptionId = 'your-subscription-id';
  const response = await client.activity.updateSubscription(subscriptionId, {
    tag: 'updated-activity-tag',
  });
  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
