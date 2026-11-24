/**
 * List Webhooks - X API v2
 *
 * Endpoint: GET https://api.x.com/2/webhooks
 * Docs: https://docs.x.com/x-api/webhooks/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const response = await client.webhooks.get();
  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
