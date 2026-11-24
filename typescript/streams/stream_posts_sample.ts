// Open a live stream of roughly 1% random sample of publicly available posts
// https://developer.twitter.com/en/docs/twitter-api/tweets/volume-streams/quick-start

import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

(async () => {
  try {
    // 1% sampled public posts
    const stream = await client.stream.postsSample({
      tweetFields: ['id', 'text', 'created_at']
    });

    // Listen to events
    stream.on('data', (event: unknown) => {
      // event is the parsed JSON line (data/includes/matching_rules)
      console.log('New data:', event);
    });

    stream.on('error', (e: any) => {
      console.error('Stream error:', e);
      if (e.status === 401) {
        console.log('Unauthorized');
        process.exit(1);
      } else if (e.detail === "This stream is currently at the maximum allowed connection limit.") {
        console.log(e.detail);
        process.exit(1);
      }
    });

    stream.on('keepAlive', () => {
      // heartbeat event - keep alive signal received
    });

    stream.on('close', () => {
      console.log('Stream closed');
    });
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
})();
