using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Compliance;

/// <summary>
/// Get Compliance Jobs - X API v2
/// Endpoint: GET https://api.x.com/2/compliance/jobs
/// Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/get-compliance-jobs
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class GetJobs
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
        var response = await client.Compliance.GetJobsAsync("tweets");
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
