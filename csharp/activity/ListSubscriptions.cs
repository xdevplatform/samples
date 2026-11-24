using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Activity;

/// <summary>
/// List Activity Subscriptions - X API v2
/// Endpoint: GET https://api.x.com/2/activity/subscriptions
/// Docs: https://docs.x.com/x-api/activity/introduction
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class ListSubscriptions
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
        var response = await client.Activity.GetSubscriptionsAsync();
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
