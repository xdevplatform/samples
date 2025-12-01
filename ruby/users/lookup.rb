# User Lookup - X API v2
#
# Endpoint: GET https://api.x.com/2/users/by
# Docs: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by
#
# Authentication: Bearer Token (App-only) or OAuth (User Context)
# Required env vars: BEARER_TOKEN

require 'json'
require 'typhoeus'

bearer_token = ENV["BEARER_TOKEN"]

url = "https://api.x.com/2/users/by"

# Usernames to look up (up to 100 comma-separated)
query_params = {
  "usernames": "XDevelopers,X",
  "user.fields": "created_at,description,public_metrics"
}

def lookup_users(url, bearer_token, query_params)
  options = {
    method: 'get',
    headers: {
      "User-Agent": "v2UserLookupRuby",
      "Authorization": "Bearer #{bearer_token}"
    },
    params: query_params
  }

  request = Typhoeus::Request.new(url, options)
  response = request.run

  return response
end

response = lookup_users(url, bearer_token, query_params)
puts response.code, JSON.pretty_generate(JSON.parse(response.body))
