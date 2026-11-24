using System.Text.Json;
using Xdk;
using Xdk.Auth;
using Xdk.Clients;
using Xdk.Models;

namespace Samples.Users.Lists;

/// <summary>
/// Unpin List - X API v2
/// Endpoint: DELETE https://api.x.com/2/users/:id/pinned_lists/:list_id
/// Docs: https://developer.x.com/en/docs/twitter-api/lists/pinned-lists/api-reference/delete-users-id-pinned_lists-list_id
/// Authentication: OAuth 2.0 PKCE (User Context) — set CLIENT_ID / CLIENT_SECRET or ACCESS_TOKEN
/// </summary>
public static class UnpinList
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
        var scopes = new[] { "tweet.read", "users.read", "list.read", "list.write", "offline.access" };
        var accessToken = await ResolveAccessTokenAsync(scopes);

        using var client = new XClient(new XClientOptions { AccessToken = accessToken });
        var userId = "your-user-id";
        var listId = "list-id-to-unpin";
        var response = await client.Users.UnpinListAsync(userId, listId);
        Console.WriteLine(JsonSerializer.Serialize(response.Data, PrettyJson));
    }
}
