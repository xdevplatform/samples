"""
Posts Liked by User - X API v2
==============================
Endpoint: GET https://api.x.com/2/users/:id/liked_tweets
Docs: https://developer.x.com/en/docs/twitter-api/tweets/likes/api-reference/get-users-id-liked_tweets

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    # Replace with the user ID you want to get liked posts for
    user_id = "2244994945"
    return "https://api.x.com/2/users/{}/liked_tweets".format(user_id)


def get_params():
    return {"tweet.fields": "created_at"}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2LikedPostsPython"
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
