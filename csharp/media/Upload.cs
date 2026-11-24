using System.Text.Json;
using Xdk;
using Xdk.Auth;
using Xdk.Clients;
using Xdk.Models;

namespace Samples.Media;

/// <summary>
/// Media Upload (Single Payload) - X API v2
/// Endpoint: POST https://api.x.com/2/media/upload
/// Docs: https://developer.x.com/en/docs/twitter-api/media/upload-media/api-reference
/// Authentication: OAuth 2.0 PKCE (User Context) — set CLIENT_ID / CLIENT_SECRET or ACCESS_TOKEN
/// </summary>
public static class Upload
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
        var scopes = new[] { "media.write", "tweet.read", "tweet.write", "users.read", "offline.access" };
        var accessToken = await ResolveAccessTokenAsync(scopes);

        using var client = new XClient(new XClientOptions { AccessToken = accessToken });
        var mediaPath = Environment.GetEnvironmentVariable("MEDIA_FILE") ?? "path/to/your/image.jpg";
        var base64Media = Convert.ToBase64String(await File.ReadAllBytesAsync(mediaPath));

        var response = await client.Media.UploadAsync(new MediaUploadRequest
        {
            Media = base64Media,
            MediaCategory = "tweet_image",
        });
        Console.WriteLine($"Media ID: {response.Data?.Id}");
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
