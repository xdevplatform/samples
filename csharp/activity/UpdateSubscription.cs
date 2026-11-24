using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Activity;

/// <summary>
/// Update Activity Subscription - X API v2
/// Endpoint: PUT https://api.x.com/2/activity/subscriptions/:id
/// Docs: https://docs.x.com/x-api/activity/introduction
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class UpdateSubscription
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
        var subscriptionId = "your-subscription-id";
        var request = new UpdateActivitySubscriptionRequest
        {
            Tag = "updated-activity-tag",
        };

        var response = await client.Activity.UpdateSubscriptionAsync(subscriptionId, request);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
