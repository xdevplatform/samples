"""
Spaces Lookup - X API v2
========================
Endpoint: GET https://api.x.com/2/spaces
Docs: https://developer.x.com/en/docs/twitter-api/spaces/lookup/api-reference/get-spaces

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    # Space IDs to look up (comma-separated)
    space_ids = "ids=1DXxyRYNejbKM"
    
    # Space fields are adjustable. Options include:
    # host_ids, created_at, creator_id, id, lang, invited_user_ids,
    # participant_count, speaker_ids, started_at, ended_at, subscriber_count,
    # topic_ids, state, title, updated_at, scheduled_start, is_ticketed
    space_fields = "space.fields=host_ids,created_at,creator_id,participant_count,title,state"
    url = "https://api.x.com/2/spaces?{}&{}".format(space_ids, space_fields)
    return url


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2SpacesLookupPython"
    return r


def connect_to_endpoint(url):
    response = requests.request("GET", url, auth=bearer_oauth)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def main():
    url = create_url()
    json_response = connect_to_endpoint(url)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
