using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Webhooks;

/// <summary>
/// Validate Webhook (Trigger CRC) - X API v2
/// Endpoint: PUT https://api.x.com/2/webhooks/:webhook_id
/// Docs: https://docs.x.com/x-api/webhooks/introduction
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class ValidateWebhook
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
        var webhookId = "your-webhook-id";
        var response = await client.Webhooks.ValidateAsync(webhookId);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
