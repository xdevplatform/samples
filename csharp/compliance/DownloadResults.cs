namespace Samples.Compliance;

/// <summary>
/// Download Compliance Results - X API v2
/// Endpoint: GET &lt;download_url&gt; (pre-signed URL from compliance job status)
/// Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/get-compliance-jobs-id
/// </summary>
public static class DownloadResults
{
    public static async Task RunAsync()
    {
        var downloadUrl = Environment.GetEnvironmentVariable("COMPLIANCE_DOWNLOAD_URL") ?? "https://example.com/download";
        using var http = new HttpClient();
        using var response = await http.GetAsync(downloadUrl);
        Console.WriteLine($"Response code: {(int)response.StatusCode}");
        var body = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Download failed with status {(int)response.StatusCode}: {body}");
        }
        foreach (var line in body.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries))
        {
            Console.WriteLine(line);
        }
    }
}
