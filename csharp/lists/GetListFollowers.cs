using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Lists;

/// <summary>
/// List Followers Lookup - X API v2
/// Endpoint: GET https://api.x.com/2/lists/:id/followers
/// Docs: https://developer.x.com/en/docs/twitter-api/lists/list-follows/api-reference/get-lists-id-followers
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetListFollowers
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
        var options = new ListsClient.GetFollowersOptions
        {
            MaxResults = 100,
            UserFields = new List<string> { "created_at", "description", "verified" },
        };

        var allUsers = new List<User>();
        await foreach (var page in client.Lists.GetFollowersPages(listId, options))
        {
            if (page.Data is not null)
            {
                allUsers.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} users (total: {allUsers.Count})");
            }
        }
        Console.WriteLine($"Total Followers: {allUsers.Count}");
        Console.WriteLine(JsonSerializer.Serialize(allUsers.Take(5), PrettyJson));
    }
}
