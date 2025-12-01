"""
Full-Archive Post Counts - X API v2
===================================
Endpoint: GET https://api.x.com/2/tweets/counts/all
Docs: https://developer.x.com/en/docs/twitter-api/tweets/counts/api-reference/get-tweets-counts-all

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN

Note: Requires Academic Research access. Returns counts from the entire archive.
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
    r.headers["User-Agent"] = "v2FullArchivePostCountsPython"
    return r


def get_params():
    return {
        "query": "from:XDevelopers",
        "granularity": "day"
    }


def connect_to_endpoint(url, params):
    response = requests.request("GET", url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def main():
    url = "https://api.x.com/2/tweets/counts/all"
    params = get_params()
    json_response = connect_to_endpoint(url, params)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
