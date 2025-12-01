"""
List Lookup - X API v2
======================
Endpoint: GET https://api.x.com/2/lists/:id
Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    # Replace with the list ID you want to look up
    list_id = "84839422"
    return "https://api.x.com/2/lists/{}".format(list_id)


def get_params():
    # List fields are adjustable. Options include:
    # created_at, follower_count, member_count, private, description, owner_id
    return {"list.fields": "created_at,follower_count,member_count,owner_id,description"}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2ListLookupPython"
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
