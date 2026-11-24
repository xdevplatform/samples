/**
 * Activity Stream - X API v2
 *
 * Endpoint: GET https://api.x.com/2/activity/stream
 * Docs: https://docs.x.com/x-api/activity/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */

import { Client } from '@xdevplatform/xdk';

const client = new Client({ bearerToken: process.env.BEARER_TOKEN });

(async () => {
  console.log('Connecting to activity stream... (press Ctrl+C to stop)');
  const stream = await client.stream.activity();

  stream.on('data', (event: unknown) => {
    console.dir(event, { depth: null });
  });

  stream.on('error', (err: any) => {
    console.error('Stream error:', err);
  });

  stream.on('close', () => {
    console.log('Activity stream closed');
  });
})().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
