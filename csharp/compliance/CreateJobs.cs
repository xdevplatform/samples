using System.Text.Json;
using Xdk;
using Xdk.Clients;
using Xdk.Models;
using Xdk.Streaming;

namespace Samples.Compliance;

/// <summary>
/// Create Compliance Job - X API v2
/// Endpoint: POST https://api.x.com/2/compliance/jobs
/// Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/post-compliance-jobs
/// Authentication: Bearer Token (App-only) — set BEARER_TOKEN
/// </summary>
public static class CreateJobs
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
        var request = new CreateComplianceJobsRequest
        {
            Type = "tweets",
            Name = "my_batch_compliance_job",
        };
        var response = await client.Compliance.CreateJobsAsync(request);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
