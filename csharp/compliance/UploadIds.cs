using System.Net.Http.Headers;

namespace Samples.Compliance;

/// <summary>
/// Upload IDs for Compliance Job - X API v2
/// Endpoint: PUT &lt;upload_url&gt; (pre-signed URL from compliance job creation)
/// Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/post-compliance-jobs
/// </summary>
public static class UploadIds
{
    public static async Task RunAsync()
    {
        var uploadUrl = Environment.GetEnvironmentVariable("COMPLIANCE_UPLOAD_URL") ?? "https://example.com/upload";
        var idsFile = Environment.GetEnvironmentVariable("COMPLIANCE_IDS_FILE") ?? "ids.txt";

        var bytes = await File.ReadAllBytesAsync(idsFile);
        using var http = new HttpClient();
        using var content = new ByteArrayContent(bytes);
        content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");

        using var response = await http.PutAsync(uploadUrl, content);
        Console.WriteLine($"Response code: {(int)response.StatusCode}");
        var body = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Upload failed with status {(int)response.StatusCode}: {body}");
        }
        Console.WriteLine(body);
    }
}
