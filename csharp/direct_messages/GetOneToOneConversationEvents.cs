using System.Text.Json;
using Xdk;
using Xdk.Auth;
using Xdk.Clients;
using Xdk.Models;

namespace Samples.DirectMessages;

/// <summary>
/// Get One-to-One Conversation Events - X API v2
/// Endpoint: GET https://api.x.com/2/dm_conversations/with/:participant_id/dm_events
/// Docs: https://developer.x.com/en/docs/twitter-api/direct-messages/lookup/api-reference/get-dm-conversations-with-participant_id-dm_events
/// Authentication: OAuth 2.0 PKCE (User Context) — set CLIENT_ID / CLIENT_SECRET or ACCESS_TOKEN
/// </summary>
public static class GetOneToOneConversationEvents
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
        var scopes = new[] { "dm.read", "tweet.read", "users.read", "offline.access" };
        var accessToken = await ResolveAccessTokenAsync(scopes);

        using var client = new XClient(new XClientOptions { AccessToken = accessToken });
        var participantId = "1716450569358098432";
        var options = new DirectMessagesClient.GetEventsByParticipantIdOptions { MaxResults = 100 };

        var allEvents = new List<object>();
        await foreach (var page in client.DirectMessages.GetEventsByParticipantIdPages(participantId, options))
        {
            if (page.Data is not null)
            {
                allEvents.AddRange(page.Data);
                Console.WriteLine($"Fetched {page.Data.Count} events (total: {allEvents.Count})");
            }
        }
        Console.WriteLine(JsonSerializer.Serialize(allEvents, PrettyJson));
    }
}
