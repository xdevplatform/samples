using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Lists;

/// <summary>
/// List Lookup by ID - X API v2
/// Endpoint: GET https://api.x.com/2/lists/:id
/// Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetListById
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
        var listId = "list-id";
        var options = new ListsClient.GetByIdOptions
        {
            ListFields = new List<string> { "created_at", "follower_count", "member_count", "owner_id", "description" },
        };
        var response = await client.Lists.GetByIdAsync(listId, options);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
