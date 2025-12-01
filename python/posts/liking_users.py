"""
Users Who Liked a Post - X API v2
=================================
Endpoint: GET https://api.x.com/2/tweets/:id/liking_users
Docs: https://developer.x.com/en/docs/twitter-api/tweets/likes/api-reference/get-tweets-id-liking_users

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    # Replace with the post ID you want to get liking users for
    post_id = "1354143047324299264"
    return "https://api.x.com/2/tweets/{}/liking_users".format(post_id)


def get_params():
    return {"user.fields": "created_at"}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2LikingUsersPython"
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
