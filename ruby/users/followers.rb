# User Followers Lookup - X API v2
#
# Endpoint: GET https://api.x.com/2/users/:id/followers
# Docs: https://developer.x.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-followers
#
# Authentication: Bearer Token (App-only) or OAuth (User Context)
# Required env vars: BEARER_TOKEN

require 'json'
require 'typhoeus'

bearer_token = ENV["BEARER_TOKEN"]

# Replace with the user ID you want to get followers for
user_id = "2244994945"
url = "https://api.x.com/2/users/#{user_id}/followers"

query_params = {
  "user.fields": "created_at,description",
  "max_results": 100
}

def get_followers(url, bearer_token, query_params)
  options = {
    method: 'get',
    headers: {
      "User-Agent": "v2FollowersRuby",
      "Authorization": "Bearer #{bearer_token}"
    },
    params: query_params
  }

  request = Typhoeus::Request.new(url, options)
  response = request.run

  return response
end

response = get_followers(url, bearer_token, query_params)
puts response.code, JSON.pretty_generate(JSON.parse(response.body))
