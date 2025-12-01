"""
Media Upload - X API v2
=======================
Endpoint: POST https://api.x.com/2/media/upload
Docs: https://developer.x.com/en/docs/twitter-api/media/upload-media/api-reference

Authentication: OAuth 1.0a (User Context)
Required env vars: CONSUMER_KEY, CONSUMER_SECRET

This example demonstrates uploading an image to attach to a post.
"""

from requests_oauthlib import OAuth1Session
import os
import json
import base64

consumer_key = os.environ.get("CONSUMER_KEY")
consumer_secret = os.environ.get("CONSUMER_SECRET")

# Path to the media file you want to upload
media_path = "path/to/your/image.jpg"

# Get request token
request_token_url = "https://api.x.com/oauth/request_token"
oauth = OAuth1Session(consumer_key, client_secret=consumer_secret)

try:
    fetch_response = oauth.fetch_request_token(request_token_url)
except ValueError:
    print(
        "There may have been an issue with the consumer_key or consumer_secret you entered."
    )

resource_owner_key = fetch_response.get("oauth_token")
resource_owner_secret = fetch_response.get("oauth_token_secret")
print("Got OAuth token: %s" % resource_owner_key)

# Get authorization
base_authorization_url = "https://api.x.com/oauth/authorize"
authorization_url = oauth.authorization_url(base_authorization_url)
print("Please go here and authorize: %s" % authorization_url)
verifier = input("Paste the PIN here: ")

# Get the access token
access_token_url = "https://api.x.com/oauth/access_token"
oauth = OAuth1Session(
    consumer_key,
    client_secret=consumer_secret,
    resource_owner_key=resource_owner_key,
    resource_owner_secret=resource_owner_secret,
    verifier=verifier,
)
oauth_tokens = oauth.fetch_access_token(access_token_url)

access_token = oauth_tokens["oauth_token"]
access_token_secret = oauth_tokens["oauth_token_secret"]

# Make the request
oauth = OAuth1Session(
    consumer_key,
    client_secret=consumer_secret,
    resource_owner_key=access_token,
    resource_owner_secret=access_token_secret,
)

# Read and encode the media file
with open(media_path, "rb") as media_file:
    media_data = base64.b64encode(media_file.read()).decode("utf-8")

# Upload the media (using v1.1 endpoint as v2 media upload is similar)
upload_url = "https://upload.twitter.com/1.1/media/upload.json"
payload = {"media_data": media_data}

response = oauth.post(upload_url, data=payload)

if response.status_code != 200:
    raise Exception(
        "Request returned an error: {} {}".format(response.status_code, response.text)
    )

print("Response code: {}".format(response.status_code))

# Get the media_id to use when creating a post
json_response = response.json()
media_id = json_response["media_id_string"]
print("Media ID: {}".format(media_id))
print(json.dumps(json_response, indent=4, sort_keys=True))

# You can now use this media_id when creating a post:
# payload = {"text": "My post with media!", "media": {"media_ids": [media_id]}}
