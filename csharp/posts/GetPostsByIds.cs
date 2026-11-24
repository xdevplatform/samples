using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Posts;

/// <summary>
/// Post Lookup by IDs - X API v2
/// Endpoint: GET https://api.x.com/2/tweets
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetPostsByIds
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
        var postIds = new List<string> { "post-id-1", "post-id-2" };
        var options = new PostsClient.GetByIdsOptions
        {
            PostFields = new List<string> { "created_at", "author_id", "lang", "source", "public_metrics", "context_annotations", "entities" },
        };
        var response = await client.Posts.GetByIdsAsync(postIds, options);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
