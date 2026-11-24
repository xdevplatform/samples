using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Users.Timeline;

/// <summary>
/// User Posts Timeline - X API v2
/// Endpoint: GET https://api.x.com/2/users/:id/tweets
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetPosts
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
        var userId = "2244994945";
        var options = new UsersClient.GetPostsOptions
        {
            MaxResults = 100,
            PostFields = new List<string> { "created_at" },
        };

        var allPosts = new List<Post>();
        await foreach (var page in client.Users.GetPostsPages(userId, options))
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
