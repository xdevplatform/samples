using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Users;

/// <summary>
/// User Lookup by Usernames - X API v2
/// Endpoint: GET https://api.x.com/2/users/by
/// Docs: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetUsersByUsernames
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
        var usernames = new List<string> { "XDevelopers", "API" };
        var options = new UsersClient.GetByUsernamesOptions
        {
            UserFields = new List<string> { "description", "created_at" },
        };
        var response = await client.Users.GetByUsernamesAsync(usernames, options);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
