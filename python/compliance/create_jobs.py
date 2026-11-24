"""
Create Compliance Job - X API v2
================================
Endpoint: POST https://api.x.com/2/compliance/jobs
Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/post-compliance-jobs

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN
"""

import os
import json
from xdk import Client

bearer_token = os.environ.get("BEARER_TOKEN")
client = Client(bearer_token=bearer_token)

# For User Compliance Job, replace the type value with users instead of tweets
# Also replace the name value with your desired job name
payload = {"type": "tweets", "name": "my_batch_compliance_job"}

def main():
    response = client.compliance.create_jobs(body=payload)
    
    print(json.dumps(response.data, indent=4, sort_keys=True))

if __name__ == "__main__":
    main()
