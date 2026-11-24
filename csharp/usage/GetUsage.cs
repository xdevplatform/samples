using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Usage;

/// <summary>
/// Usage Posts - X API v2
/// Endpoint: GET https://api.x.com/2/usage/tweets
/// Docs: https://developer.x.com/en/docs/twitter-api/usage/api-reference/get-usage-tweets
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetUsage
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
        var response = await client.Usage.GetAsync(new UsageClient.GetOptions { Days = 7 });
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
