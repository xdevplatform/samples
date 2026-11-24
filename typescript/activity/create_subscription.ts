/**
 * Create Activity Subscription - X API v2
 *
 * Endpoint: POST https://api.x.com/2/activity/subscriptions
 * Docs: https://docs.x.com/x-api/activity/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const userId = '2244994945';
  const eventType = 'profile.update.bio';

  const response = await client.activity.createSubscription({
    eventType,
    filter: { userId },
    tag: `${eventType} for user ${userId}`,
  });

  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
