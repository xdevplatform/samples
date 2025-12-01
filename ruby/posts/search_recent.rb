# Recent Search - X API v2
#
# Endpoint: GET https://api.x.com/2/tweets/search/recent
# Docs: https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
#
# Authentication: Bearer Token (App-only)
# Required env vars: BEARER_TOKEN
#
# Note: Returns posts from the last 7 days.

require 'json'
require 'typhoeus'

bearer_token = ENV["BEARER_TOKEN"]

search_url = "https://api.x.com/2/tweets/search/recent"

# Set the query value here. Value can be up to 512 characters
query = "from:XDevelopers -is:retweet"

# See docs for list of param options:
# https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
query_params = {
  "query": query,
  "max_results": 10,
  "tweet.fields": "attachments,author_id,conversation_id,created_at,entities,id,lang",
  "user.fields": "description"
}

def search_posts(url, bearer_token, query_params)
  options = {
    method: 'get',
    headers: {
      "User-Agent": "v2RecentSearchRuby",
      "Authorization": "Bearer #{bearer_token}"
    },
    params: query_params
  }

  request = Typhoeus::Request.new(url, options)
  response = request.run

  return response
end

response = search_posts(search_url, bearer_token, query_params)
puts response.code, JSON.pretty_generate(JSON.parse(response.body))
