/**
 * Register Webhook - X API v2
 *
 * Endpoint: POST https://api.x.com/2/webhooks
 * Docs: https://docs.x.com/x-api/webhooks/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

const { Client } = require('@xdevplatform/xdk');

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  const webhookUrl = 'https://your-domain.com/webhooks';
  const response = await client.webhooks.create({ url: webhookUrl });
  console.dir(response, { depth: null });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
