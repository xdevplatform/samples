# Post Lookup - X API v2
#
# Endpoint: GET https://api.x.com/2/tweets
# Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
#
# Authentication: Bearer Token (App-only) or OAuth (User Context)
# Required env vars: BEARER_TOKEN

require 'json'
require 'typhoeus'

bearer_token = ENV["BEARER_TOKEN"]

# Post IDs to look up (comma-separated, up to 100)
post_ids = "1278747501642657792,1255542774432063488"
url = "https://api.x.com/2/tweets"

query_params = {
  "ids": post_ids,
  "tweet.fields": "created_at,author_id,lang,source,public_metrics"
}

def lookup_posts(url, bearer_token, query_params)
  options = {
    method: 'get',
    headers: {
      "User-Agent": "v2PostLookupRuby",
      "Authorization": "Bearer #{bearer_token}"
    },
    params: query_params
  }

  request = Typhoeus::Request.new(url, options)
  response = request.run

  return response
end

response = lookup_posts(url, bearer_token, query_params)
puts response.code, JSON.pretty_generate(JSON.parse(response.body))
