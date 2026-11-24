using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Streams;

/// <summary>
/// Filtered Stream - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/search/stream
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class StreamPostsFiltered
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
        // 1. Fetch existing rules
        var currentRules = await client.Stream.GetRulesAsync();

        // 2. Delete existing rules by value if present
        if (currentRules.Data is { Count: > 0 })
        {
            var values = currentRules.Data
                .Where(r => !string.IsNullOrEmpty(r.Value))
                .Select(r => r.Value!)
                .ToList();
            if (values.Count > 0)
            {
                await client.Stream.UpdateRulesAsync(new UpdateRulesRequest
                {
                    Delete = new UpdateRulesDelete { Values = values },
                });
            }
        }

        // 3. Add sample filter rules
        var added = await client.Stream.UpdateRulesAsync(new UpdateRulesRequest
        {
            Add = new List<UpdateRulesAdd>
            {
                new() { Value = "dog has:images", Tag = "dog pictures" },
                new() { Value = "cat has:images -grumpy", Tag = "cat pictures" },
            },
        });
        Console.WriteLine(JsonSerializer.Serialize(added.Data, PrettyJson));

        // 4. Stream matching posts in real time
        var options = new StreamClient.PostsOptions
        {
            TweetFields = new List<string> { "id", "text", "created_at" },
        };
        await using var stream = client.Stream.PostsStream(options);
        await foreach (var evt in stream)
        {
            if (evt.Data is not null)
            {
                Console.WriteLine(JsonSerializer.Serialize(evt.Data, PrettyJson));
            }
        }
    }
}
