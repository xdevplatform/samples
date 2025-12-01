"""
Sampled Stream (1% Volume) - X API v2
=====================================
Endpoint: GET https://api.x.com/2/tweets/sample/stream
Docs: https://developer.x.com/en/docs/twitter-api/tweets/volume-streams/api-reference/get-tweets-sample-stream

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN

Note: Returns approximately 1% of all public posts in real-time.
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2SampledStreamPython"
    return r


def get_stream():
    response = requests.get(
        "https://api.x.com/2/tweets/sample/stream", auth=bearer_oauth, stream=True,
    )
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Cannot get stream (HTTP {}): {}".format(
                response.status_code, response.text
            )
        )
    for response_line in response.iter_lines():
        if response_line:
            json_response = json.loads(response_line)
            print(json.dumps(json_response, indent=4, sort_keys=True))


def main():
    get_stream()


if __name__ == "__main__":
    main()
