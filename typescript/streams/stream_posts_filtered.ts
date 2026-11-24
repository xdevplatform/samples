// Open a realtime stream of posts, filtered according to rules
// https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/quick-start

import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// this sets up two rules - the value is the search terms to match on, and the tag is an identifier that
// will be applied to the posts returned to show which rule they matched
// with a standard project with Basic Access, you can add up to 25 concurrent rules to your stream, and
// each rule can be up to 512 characters long

// Edit rules as desired below
const rules = [{
        value: 'dog has:images -is:retweet',
        tag: 'dog pictures'
    },
    {
        value: 'cat has:images -grumpy',
        tag: 'cat pictures'
    },
];

(async () => {
    try {
        // Gets the complete list of rules currently applied to the stream
        const currentRules = await client.stream.getRules();

        // Delete all rules. Comment the line below if you want to keep your existing rules.
        if (currentRules.data && currentRules.data.length > 0) {
            const ids = currentRules.data.map((rule) => rule.id).filter((id): id is string => Boolean(id));
            await client.stream.updateRules({ delete: { ids: ids } });
        }

        // Add rules to the stream. Comment the line below if you don't want to add new rules.
        await client.stream.updateRules({ add: rules });

        // Listen to the stream
        const stream = await client.stream.posts({
            tweetFields: ['id', 'text', 'created_at']
        });

        stream.on('data', (event: unknown) => {
            // event is the parsed JSON line (data/includes/matching_rules)
            console.log('New data:', event);
        });

        stream.on('error', (e: any) => {
            console.error('Stream error:', e);
            if (e.detail === "This stream is currently at the maximum allowed connection limit.") {
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
        console.error(e);
        process.exit(1);
    }
})();
