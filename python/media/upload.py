"""
Media Upload - X API v2
=======================
Endpoint: POST https://api.x.com/2/media/upload
Docs: https://developer.x.com/en/docs/twitter-api/media/upload-media/api-reference

Authentication: OAuth 2.0 (User Context)
Required env vars: CLIENT_ID, CLIENT_SECRET

This example demonstrates uploading an image to attach to a post.
"""

import os
import json
import base64
from xdk import Client
from xdk.oauth2_auth import OAuth2PKCEAuth

# The code below sets the client ID and client secret from your environment variables
# To set environment variables on macOS or Linux, run the export commands below from the terminal:
# export CLIENT_ID='YOUR-CLIENT-ID'
# export CLIENT_SECRET='YOUR-CLIENT-SECRET'
client_id = os.environ.get("CLIENT_ID")
client_secret = os.environ.get("CLIENT_SECRET")

# Replace the following URL with your callback URL, which can be obtained from your App's auth settings.
redirect_uri = "https://example.com"

# Set the scopes
scopes = ["media.write", "tweet.read", "tweet.write", "users.read", "offline.access"]

# Path to the media file you want to upload
media_path = "path/to/your/image.jpg"

def main():
    # Step 1: Create PKCE instance
    auth = OAuth2PKCEAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri,
        scope=scopes
    )
    
    # Step 2: Get authorization URL
    auth_url = auth.get_authorization_url()
    print("Visit the following URL to authorize your App on behalf of your X handle in a browser:")
    print(auth_url)
    
    # Step 3: Handle callback
    callback_url = input("Paste the full callback URL here: ")
    
    # Step 4: Exchange code for tokens
    tokens = auth.fetch_token(authorization_response=callback_url)
    access_token = tokens["access_token"]
    
    # Step 5: Create client
    client = Client(access_token=access_token)
    
    # Step 6: Read and upload the media file
    with open(media_path, "rb") as media_file:
        media_data = base64.b64encode(media_file.read()).decode("utf-8")
    
    payload = {"media": media_data, "media_category": "tweet_image"}
    response = client.media.upload(body=payload)
    
    print("Response code: 200")
    
    # Get the media id to use when creating a post
    media_id = response.data["id"]
    print("Media ID: {}".format(media_id))
    print(json.dumps(response.data, indent=4, sort_keys=True))
    
    # You can now use this media_id when creating a post:
    # payload = {"text": "My post with media!", "media": {"media_ids": [media_id]}}

if __name__ == "__main__":
    main()
