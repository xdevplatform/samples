using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Posts;

/// <summary>
/// Quote Posts Lookup - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/:id/quote_tweets
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/quote-tweets/api-reference/get-tweets-id-quote_tweets
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetQuotedPosts
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
        var postId = "1409931481552543749";
        var options = new PostsClient.GetQuotedOptions
        {
            MaxResults = 100,
            PostFields = new List<string> { "created_at" },
        };

        var allPosts = new List<Post>();
        await foreach (var page in client.Posts.GetQuotedPages(postId, options))
        {
            if (page.Data is not null)
            {
                allPosts.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} posts (total: {allPosts.Count})");
            }
        }
        Console.WriteLine($"Total Quote Posts: {allPosts.Count}");
        Console.WriteLine(JsonSerializer.Serialize(allPosts.Take(5), PrettyJson));
    }
}
