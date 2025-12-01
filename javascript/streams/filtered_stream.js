/**
 * Filtered Stream - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/tweets/search/stream
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream
 * 
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 * 
 * This example demonstrates:
 * 1. Getting existing rules
 * 2. Deleting all existing rules
 * 3. Setting new rules
 * 4. Connecting to the stream
 */

const needle = require('needle');

const token = process.env.BEARER_TOKEN;
const rulesURL = 'https://api.x.com/2/tweets/search/stream/rules';
const streamURL = 'https://api.x.com/2/tweets/search/stream';

// Adjust rules as needed
const rules = [
    { 'value': 'dog has:images', 'tag': 'dog pictures' },
    { 'value': 'cat has:images -grumpy', 'tag': 'cat pictures' },
];

async function getAllRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    if (response.statusCode !== 200) {
        throw new Error(`Error getting rules: ${response.body}`);
    }

    return response.body;
}

async function deleteAllRules(rules) {
    if (!Array.isArray(rules.data)) {
        return null;
    }

    const ids = rules.data.map(rule => rule.id);
    const data = { "delete": { "ids": ids } };

    const response = await needle('post', rulesURL, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    if (response.statusCode !== 200) {
        throw new Error(`Error deleting rules: ${response.body}`);
    }

    return response.body;
}

async function setRules() {
    const data = { "add": rules };

    const response = await needle('post', rulesURL, data, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    if (response.statusCode !== 201) {
        throw new Error(`Error setting rules: ${response.body}`);
    }

    return response.body;
}

function streamConnect() {
    const stream = needle.get(streamURL, {
        headers: {
            "User-Agent": "v2FilteredStreamJS",
            "Authorization": `Bearer ${token}`
        },
        timeout: 20000
    });

    stream.on('data', data => {
        try {
            const json = JSON.parse(data);
            console.log(json);
        } catch (e) {
            // Keep alive signal received
        }
    });

    stream.on('error', error => {
        if (error.code === 'ETIMEDOUT') {
            stream.emit('timeout');
        }
    });

    return stream;
}

(async () => {
    try {
        // Get all stream rules
        let currentRules = await getAllRules();
        console.log("Current rules:", currentRules);

        // Delete all stream rules
        await deleteAllRules(currentRules);
        console.log("Deleted existing rules");

        // Set new rules
        await setRules();
        console.log("Set new rules");

        // Connect to the stream
        console.log("Connecting to stream...");
        streamConnect();
    } catch (e) {
        console.error(e);
        process.exit(-1);
    }
})();
