using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Posts;

/// <summary>
/// Full-Archive Search - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/search/all
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-all
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class SearchAll
{
    private static readonly JsonSerializerOptions PrettyJson = new() { WriteIndented = true };

    public static async Task RunAsync()
    {
        var bearerToken = Environment.GetEnvironmentVariable("BEARER_TOKEN");
        if (string.IsNullOrWhiteSpace(bearerToken))
        {
            throw new InvalidOperationException("BEARER_TOKEN environment variable is not set");
        }

        using var client = new XClient(new XClientOptions { BearerToken = bearerToken });
        var query = "(from:XDevelopers -is:retweet) OR #XDevelopers";
        var options = new PostsClient.SearchAllOptions
        {
            MaxResults = 100,
            PostFields = new List<string> { "author_id", "created_at" },
        };

        var allPosts = new List<Post>();
        await foreach (var page in client.Posts.SearchAllPages(query, options))
        {
            if (page.Data is not null)
            {
                allPosts.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} posts (total: {allPosts.Count})");
            }
        }
        Console.WriteLine($"Total Posts: {allPosts.Count}");
        Console.WriteLine(JsonSerializer.Serialize(allPosts.Take(5), PrettyJson));
    }
}
