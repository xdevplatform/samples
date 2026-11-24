using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Posts;

/// <summary>
/// Reposted By (Users who reposted) - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/:id/retweeted_by
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/retweets/api-reference/get-tweets-id-retweeted_by
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetRepostedBy
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
        var postId = "post-id";
        var options = new PostsClient.GetRepostedByOptions
        {
            MaxResults = 100,
            UserFields = new List<string> { "created_at", "description" },
        };

        var allUsers = new List<User>();
        await foreach (var page in client.Posts.GetRepostedByPages(postId, options))
        {
            if (page.Data is not null)
            {
                allUsers.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} users (total: {allUsers.Count})");
            }
        }
        Console.WriteLine($"Total Users: {allUsers.Count}");
        Console.WriteLine(JsonSerializer.Serialize(allUsers.Take(5), PrettyJson));
    }
}
