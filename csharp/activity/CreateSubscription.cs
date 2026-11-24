using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Activity;

/// <summary>
/// Create Activity Subscription - X API v2
/// Endpoint: POST https://api.x.com/2/activity/subscriptions
/// Docs: https://docs.x.com/x-api/activity/introduction
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class CreateSubscription
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
        var eventType = "profile.update.bio";

        var request = new CreateActivitySubscriptionRequest
        {
            EventType = eventType,
            Filter = new CreateActivitySubscriptionFilter { UserId = userId },
            Tag = $"{eventType} for user {userId}",
        };

        var response = await client.Activity.CreateSubscriptionAsync(request);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
