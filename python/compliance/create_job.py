"""
Create Compliance Job - X API v2
================================
Endpoint: POST https://api.x.com/2/compliance/jobs
Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/post-compliance-jobs

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN
"""

import requests
import os
import json

bearer_token = os.environ.get("BEARER_TOKEN")


def create_url():
    return "https://api.x.com/2/compliance/jobs"


def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """
    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2ComplianceJobPython"
    return r


def connect_to_endpoint(url, payload):
    response = requests.post(url, auth=bearer_oauth, json=payload)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def main():
    url = create_url()
    
    # Type can be "tweets" or "users"
    payload = {
        "type": "tweets",
        "name": "my_compliance_job"
    }
    
    json_response = connect_to_endpoint(url, payload)
    print(json.dumps(json_response, indent=4, sort_keys=True))
    
    # Note the job id and upload_url from the response
    # You'll need these to upload your dataset and download results


if __name__ == "__main__":
    main()
