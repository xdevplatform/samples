"""
Post Lookup - X API v2
======================
Endpoint: GET https://api.x.com/2/tweets
Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets

Authentication: Bearer Token (App-only) or OAuth (User Context)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    # Post IDs to look up (comma-separated, up to 100)
    post_ids = "ids=1278747501642657792,1255542774432063488"
    
    # Post fields are adjustable. Options include:
    # attachments, author_id, context_annotations, conversation_id,
    # created_at, entities, geo, id, in_reply_to_user_id, lang,
    # non_public_metrics, organic_metrics, possibly_sensitive,
    # promoted_metrics, public_metrics, referenced_tweets,
    # source, text, and withheld
    post_fields = "tweet.fields=created_at,author_id,lang,source,public_metrics,context_annotations,entities"
    url = "https://api.x.com/2/tweets?{}&{}".format(post_ids, post_fields)
    return url


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2PostLookupPython"
    return r


def connect_to_endpoint(url):
    response = requests.request("GET", url, auth=bearer_oauth)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(
            "Request returned an error: {} {}".format(
                response.status_code, response.text
            )
        )
    return response.json()


def main():
    url = create_url()
    json_response = connect_to_endpoint(url)
    print(json.dumps(json_response, indent=4, sort_keys=True))


if __name__ == "__main__":
    main()
