"""
Get Compliance Job by ID - X API v2
===================================
Endpoint: GET https://api.x.com/2/compliance/jobs/:id
Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/get-compliance-jobs-id

Authentication: Bearer Token (App-only)
Required env vars: BEARER_TOKEN
"""

import os
import json
from xdk import Client

bearer_token = os.environ.get("BEARER_TOKEN")
client = Client(bearer_token=bearer_token)

# Replace with your job ID below
job_id = ''

def main():
    response = client.compliance.get_jobs_by_id(job_id)
    
    print(json.dumps(response.data, indent=4, sort_keys=True))

if __name__ == "__main__":
    main()
