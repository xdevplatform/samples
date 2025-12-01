# List Lookup - X API v2
#
# Endpoint: GET https://api.x.com/2/lists/:id
# Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id
#
# Authentication: Bearer Token (App-only) or OAuth (User Context)
# Required env vars: BEARER_TOKEN

require 'json'
require 'typhoeus'

bearer_token = ENV["BEARER_TOKEN"]

# Replace with the list ID you want to look up
list_id = "84839422"
url = "https://api.x.com/2/lists/#{list_id}"

query_params = {
  "list.fields": "created_at,follower_count,member_count,owner_id,description"
}

def lookup_list(url, bearer_token, query_params)
  options = {
    method: 'get',
    headers: {
      "User-Agent": "v2ListLookupRuby",
      "Authorization": "Bearer #{bearer_token}"
    },
    params: query_params
  }

  request = Typhoeus::Request.new(url, options)
  response = request.run

  return response
end

response = lookup_list(url, bearer_token, query_params)
puts response.code, JSON.pretty_generate(JSON.parse(response.body))
