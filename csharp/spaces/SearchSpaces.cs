using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Spaces;

/// <summary>
/// Search Spaces - X API v2
/// Endpoint: GET https://api.x.com/2/spaces/search
/// Docs: https://developer.x.com/en/docs/twitter-api/spaces/search/api-reference/get-spaces-search
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class SearchSpaces
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
        var searchTerm = "NBA";
        var options = new SpacesClient.SearchOptions
        {
            SpaceFields = new List<string> { "title", "created_at" },
            Expansions = new List<string> { "creator_id" },
        };
        var response = await client.Spaces.SearchAsync(searchTerm, options);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
