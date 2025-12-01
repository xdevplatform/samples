"""
Bookmarks Lookup - X API v2
===========================
Endpoint: GET https://api.x.com/2/users/:id/bookmarks
Docs: https://developer.x.com/en/docs/twitter-api/tweets/bookmarks/api-reference/get-users-id-bookmarks

Authentication: OAuth 2.0 with PKCE (User Context)
Required env vars: BEARER_TOKEN (OAuth 2.0 user access token)
"""

import requests
import os
import json

# Note: This endpoint requires OAuth 2.0 User Context
# The bearer_token here should be the user's access token from OAuth 2.0 PKCE flow
bearer_token = os.environ.get("BEARER_TOKEN")


def create_url(user_id):
    return "https://api.x.com/2/users/{}/bookmarks".format(user_id)


def get_params():
    return {"tweet.fields": "created_at"}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2BookmarksLookupPython"
    return r


def connect_to_endpoint(url, params):
    response = requests.request("GET", url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def main():
    # Replace with the authenticated user's ID
    user_id = "your-user-id"
    url = create_url(user_id)
    params = get_params()
    json_response = connect_to_endpoint(url, params)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
