using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Streams;

/// <summary>
/// Sampled Stream (1% Volume) - X API v2
/// Endpoint: GET https://api.x.com/2/tweets/sample/stream
/// Docs: https://developer.x.com/en/docs/twitter-api/tweets/volume-streams/api-reference/get-tweets-sample-stream
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class StreamPostsSample
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
        await using var stream = client.Stream.PostsSampleStream();
        await foreach (var evt in stream)
        {
            if (evt.Data is not null)
            {
                Console.WriteLine(JsonSerializer.Serialize(evt.Data, PrettyJson));
            }
        }
    }
}
