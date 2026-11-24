using System.Text.Json;
using Xdk;
using Xdk.Auth;
using Xdk.Clients;
using Xdk.Models;

namespace Samples.Media;

/// <summary>
/// Media Upload v2 (Chunked Video Upload) - X API v2
/// Endpoint: POST https://api.x.com/2/media/upload/initialize | append | finalize
/// Docs: https://developer.x.com/en/docs/twitter-api/media/upload-media/api-reference
/// Authentication: OAuth 2.0 PKCE (User Context) — set CLIENT_ID / CLIENT_SECRET or ACCESS_TOKEN
/// </summary>
public static class MediaUploadV2
{
    private static readonly JsonSerializerOptions PrettyJson = new() { WriteIndented = true };

    private static string ExtractAuthorizationCode(string callbackInput)
    {
        var trimmed = callbackInput.Trim();
        if (!trimmed.Contains("://") && !trimmed.Contains("code="))
        {
            return trimmed;
        }
        var query = trimmed.Contains('?') ? new Uri(trimmed).Query.TrimStart('?') : trimmed;
        foreach (var pair in query.Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var kv = pair.Split('=', 2);
            if (kv.Length == 2 && kv[0] == "code")
            {
                return Uri.UnescapeDataString(kv[1]);
            }
        }
        throw new ArgumentException("No 'code' query parameter found in callback URL");
    }

    private static async Task<string> ResolveAccessTokenAsync(string[] scopes)
    {
        var directToken = Environment.GetEnvironmentVariable("ACCESS_TOKEN");
        if (!string.IsNullOrWhiteSpace(directToken))
        {
            return directToken;
        }

        var clientId = Environment.GetEnvironmentVariable("CLIENT_ID");
        var clientSecret = Environment.GetEnvironmentVariable("CLIENT_SECRET");
        if (string.IsNullOrWhiteSpace(clientId))
        {
            throw new InvalidOperationException("Set CLIENT_ID (and optionally CLIENT_SECRET) or ACCESS_TOKEN");
        }

        var redirectUri = Environment.GetEnvironmentVariable("REDIRECT_URI") ?? "https://example.com";
        var oauth2 = new OAuth2Pkce(clientId, redirectUri, clientSecret: clientSecret, scopes: scopes);
        var authUrl = oauth2.GetAuthorizationUrl("sample-state");
        Console.WriteLine("Visit the following URL to authorize your App:");
        Console.WriteLine(authUrl);
        Console.Write("Paste the full callback URL (or code) here: ");
        var callbackUrl = Console.ReadLine() ?? string.Empty;
        var token = await oauth2.ExchangeCodeAsync(ExtractAuthorizationCode(callbackUrl));
        return token.AccessToken ?? throw new InvalidOperationException("OAuth2 token response did not include access_token");
    }

    public static async Task RunAsync()
    {
        var scopes = new[] { "media.write", "users.read", "tweet.read", "tweet.write", "offline.access" };
        var accessToken = await ResolveAccessTokenAsync(scopes);

        using var client = new XClient(new XClientOptions { AccessToken = accessToken });
        var videoPath = Environment.GetEnvironmentVariable("VIDEO_FILE") ?? "path/to/your/video.mp4";
        var allBytes = await File.ReadAllBytesAsync(videoPath);

        // 1. Initialize chunked upload
        var initRes = await client.Media.InitializeUploadAsync(new InitializeMediaUploadRequest
        {
            MediaType = "video/mp4",
            MediaCategory = "tweet_video",
            TotalBytes = allBytes.LongLength,
        });
        var mediaId = initRes.Data?.Id ?? throw new InvalidOperationException("No media ID returned");
        Console.WriteLine($"Initialized upload for mediaId: {mediaId}");

        // 2. Append 4 MiB chunks
        const int chunkSize = 4 * 1024 * 1024;
        var segmentIndex = 0;
        for (var offset = 0; offset < allBytes.Length; offset += chunkSize)
        {
            var count = Math.Min(chunkSize, allBytes.Length - offset);
            var base64Chunk = Convert.ToBase64String(allBytes, offset, count);
            await client.Media.AppendUploadAsync(mediaId, new AppendMediaUploadRequest
            {
                SegmentIndex = segmentIndex++,
                Media = base64Chunk,
            });
            Console.WriteLine($"Uploaded {offset + count} / {allBytes.Length} bytes");
        }

        // 3. Finalize & poll processing status
        var finRes = await client.Media.FinalizeUploadAsync(mediaId);
        var state = finRes.Data?.ProcessingInfo?.State;
        var checkAfterSecs = finRes.Data?.ProcessingInfo?.CheckAfterSecs ?? 2L;
        while (!string.IsNullOrEmpty(state) && state != "succeeded" && state != "failed")
        {
            await Task.Delay(TimeSpan.FromSeconds(checkAfterSecs));
            var statusRes = await client.Media.GetUploadStatusAsync(
                mediaId,
                new MediaClient.GetUploadStatusOptions { Command = "STATUS" });
            state = statusRes.Data?.ProcessingInfo?.State;
            checkAfterSecs = statusRes.Data?.ProcessingInfo?.CheckAfterSecs ?? 2L;
        }

        // 4. Create post with attached video
        var postRes = await client.Posts.CreateAsync(new CreatePostsRequest
        {
            Text = "Uploaded a video using XDK for C#!",
            Media = new CreatePostsMedia { MediaIds = new List<string> { mediaId } },
        });
        Console.WriteLine(JsonSerializer.Serialize(postRes.Data, PrettyJson));
    }
}
