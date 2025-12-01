"""
Quote Posts Lookup - X API v2
=============================
Endpoint: GET https://api.x.com/2/tweets/:id/quote_tweets
Docs: https://developer.x.com/en/docs/twitter-api/tweets/quote-tweets/api-reference/get-tweets-id-quote_tweets

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")

# Replace with the post ID you want to get quotes for
post_id = "1409931481552543749"


def get_params():
    return {"tweet.fields": "created_at"}


def create_url():
    return "https://api.x.com/2/tweets/{}/quote_tweets".format(post_id)


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2QuotePostsPython"
    return r


def connect_to_endpoint(url, params):
    response = requests.request("GET", url, auth=bearer_oauth, params=params)
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
