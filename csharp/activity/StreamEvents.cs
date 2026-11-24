using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Activity;

/// <summary>
/// Activity Stream - X API v2
/// Endpoint: GET https://api.x.com/2/activity/stream
/// Docs: https://docs.x.com/x-api/activity/introduction
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class StreamEvents
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
        Console.WriteLine("Connecting to activity stream... (press Ctrl+C to stop)");
        await using var stream = client.Stream.ActivityStream();
        await foreach (var evt in stream)
        {
            if (evt.Data is not null)
            {
                Console.WriteLine(JsonSerializer.Serialize(evt.Data, PrettyJson));
            }
        }
    }
}
