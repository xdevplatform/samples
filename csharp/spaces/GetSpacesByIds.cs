using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Spaces;

/// <summary>
/// Spaces Lookup by IDs - X API v2
/// Endpoint: GET https://api.x.com/2/spaces
/// Docs: https://developer.x.com/en/docs/twitter-api/spaces/lookup/api-reference/get-spaces
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetSpacesByIds
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
        var spaceIds = new List<string> { "space-id-1", "space-id-2" };
        var options = new SpacesClient.GetByIdsOptions
        {
            SpaceFields = new List<string> { "title", "created_at" },
            Expansions = new List<string> { "creator_id" },
        };
        var response = await client.Spaces.GetByIdsAsync(spaceIds, options);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
