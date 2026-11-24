"""
Activity Stream - X API v2
==========================
Endpoint: GET https://api.x.com/2/activity/stream
Docs: https://docs.x.com/x-api/activity/introduction

Opens a persistent HTTP connection and streams real-time activity events
matching your active subscriptions. Events are delivered as they occur on
the platform — no polling required.

You must create at least one subscription (see create_subscription.py) before
events will be delivered to this stream.

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN
"""

import os
import json
from xdk import Client

bearer_token = os.environ.get("BEARER_TOKEN")
client = Client(bearer_token=bearer_token)

def main():
    print("Connecting to activity stream... (press Ctrl+C to stop)")

    # The activity() stream method returns a generator that yields events as they arrive.
    # The SDK manages reconnection with exponential backoff automatically.
    for event in client.stream.activity():
        # Access data attribute (model uses extra='allow' so data should be available)
        # Use getattr with fallback in case data field is missing from response
        event_data = getattr(event, 'data', None)
        if event_data:
            print(json.dumps(event_data, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
