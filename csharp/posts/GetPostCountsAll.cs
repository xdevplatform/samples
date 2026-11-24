using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Posts;

/// <summary>
/// Full-Archive Post Counts - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/counts/all
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/counts/api-reference/get-tweets-counts-all
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetPostCountsAll
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
        var query = "from:XDevelopers";
        var options = new PostsClient.GetCountsAllOptions { Granularity = "day" };

        var allCounts = new List<GetPostsCountsAllResponseData>();
        await foreach (var page in client.Posts.GetCountsAllPages(query, options))
        {
            if (page.Data is not null)
            {
                allCounts.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} count buckets (total: {allCounts.Count})");
            }
        }
        Console.WriteLine($"Total Count Buckets: {allCounts.Count}");
        Console.WriteLine(JsonSerializer.Serialize(allCounts, PrettyJson));
    }
}
