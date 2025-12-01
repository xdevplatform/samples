# User Posts Timeline - X API v2
#
# Endpoint: GET https://api.x.com/2/users/:id/tweets
# Docs: https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
#
# Authentication: Bearer Token (App-only) or OAuth (User Context)
# Required env vars: BEARER_TOKEN

require 'json'
require 'typhoeus'

bearer_token = ENV["BEARER_TOKEN"]

# Replace with the user ID you want to get posts for
user_id = "2244994945"
url = "https://api.x.com/2/users/#{user_id}/tweets"

query_params = {
  "tweet.fields": "created_at,public_metrics",
  "max_results": 10
}

def get_user_posts(url, bearer_token, query_params)
  options = {
    method: 'get',
    headers: {
      "User-Agent": "v2UserPostsRuby",
      "Authorization": "Bearer #{bearer_token}"
    },
    params: query_params
  }

  request = Typhoeus::Request.new(url, options)
  response = request.run

  return response
end

response = get_user_posts(url, bearer_token, query_params)
puts response.code, JSON.pretty_generate(JSON.parse(response.body))
