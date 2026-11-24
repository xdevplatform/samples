using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Posts;

/// <summary>
/// Single Post Lookup - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/:id
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetPostById
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
        var options = new PostsClient.GetByIdOptions
        {
            PostFields = new List<string> { "created_at", "author_id", "lang", "source", "public_metrics", "entities" },
        };
        var response = await client.Posts.GetByIdAsync(postId, options);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
