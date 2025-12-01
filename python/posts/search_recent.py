"""
Recent Search - X API v2
========================
Endpoint: GET https://api.x.com/2/tweets/search/recent
Docs: https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN

Note: Returns posts from the last 7 days.
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")

search_url = "https://api.x.com/2/tweets/search/recent"

# Optional params: start_time, end_time, since_id, until_id, max_results, next_token,
# expansions, tweet.fields, media.fields, poll.fields, place.fields, user.fields
query_params = {
    'query': '(from:XDevelopers -is:retweet) OR #xapi',
    'tweet.fields': 'author_id'
}


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r


def connect_to_endpoint(url, params):
    response = requests.get(url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def main():
    json_response = connect_to_endpoint(search_url, query_params)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
