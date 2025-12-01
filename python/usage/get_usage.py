"""
Usage Posts - X API v2
======================
Endpoint: GET https://api.x.com/2/usage/tweets
Docs: https://developer.x.com/en/docs/twitter-api/usage/api-reference/get-usage-tweets

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN

Returns the number of posts read from the API.
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    return "https://api.x.com/2/usage/tweets"


def get_params():
    return {"days": 7}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2UsagePython"
    return r


def connect_to_endpoint(url, params):
    response = requests.get(url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def main():
    url = create_url()
    params = get_params()
    json_response = connect_to_endpoint(url, params)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
