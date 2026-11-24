using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Users.Lists;

/// <summary>
/// User Owned Lists Lookup - X API v2
/// Endpoint: GET https://api.x.com/2/users/:id/owned_lists
/// Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-users-id-owned_lists
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetOwnedLists
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
        var userId = "user-id";
        var options = new UsersClient.GetOwnedListsOptions
        {
            MaxResults = 100,
            ListFields = new List<string> { "created_at", "follower_count" },
        };

        var allLists = new List<XList>();
        await foreach (var page in client.Users.GetOwnedListsPages(userId, options))
        {
            if (page.Data is not null)
            {
                allLists.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} lists (total: {allLists.Count})");
            }
        }
        Console.WriteLine($"Total Owned Lists: {allLists.Count}");
        Console.WriteLine(JsonSerializer.Serialize(allLists.Take(5), PrettyJson));
    }
}
