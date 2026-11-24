package users.bookmark;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.x.xdk.Paginator;
import com.x.xdk.XClient;
import com.x.xdk.XClientConfig;
import com.x.xdk.auth.OAuth2Pkce;
import com.x.xdk.auth.OAuth2Token;
import com.x.xdk.clients.*;
import com.x.xdk.models.Schemas;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Scanner;

/**
 * Bookmarks Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/users/:id/bookmarks
 * Docs: https://developer.x.com/en/docs/twitter-api/bookmarks/api-reference/get-users-id-bookmarks
 *
 * Authentication: OAuth 2.0 PKCE (User Context)
 * Required env vars: CLIENT_ID, CLIENT_SECRET (or ACCESS_TOKEN)
 */
public class GetBookmarks {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static String extractAuthorizationCode(String callbackInput) {
        String trimmed = callbackInput.trim();
        if (!trimmed.contains("://") && !trimmed.contains("code=")) {
            return trimmed;
        }
        String query = trimmed.contains("?") ? URI.create(trimmed).getRawQuery() : trimmed;
        if (query != null) {
            for (String pair : query.split("&")) {
                String[] kv = pair.split("=", 2);
                if (kv.length == 2 && "code".equals(kv[0])) {
                    return URLDecoder.decode(kv[1], StandardCharsets.UTF_8);
                }
            }
        }
        throw new IllegalArgumentException("No 'code' query parameter found in callback URL");
    }

    private static String resolveAccessToken(List<String> scopes) {
        String directToken = System.getenv("ACCESS_TOKEN");
        if (directToken != null && !directToken.isBlank()) {
            return directToken;
        }

        String clientId = System.getenv("CLIENT_ID");
        String clientSecret = System.getenv("CLIENT_SECRET");
        if (clientId == null || clientId.isBlank()) {
            throw new IllegalStateException("Set CLIENT_ID (and optionally CLIENT_SECRET) or ACCESS_TOKEN");
        }

        String redirectUri = System.getenv().getOrDefault("REDIRECT_URI", "https://example.com");
        OAuth2Pkce oauth2 = new OAuth2Pkce(clientId, clientSecret, redirectUri, scopes);
        String authUrl = oauth2.getAuthorizationUrl("sample-state");
        System.out.println("Visit the following URL to authorize your App:");
        System.out.println(authUrl);
        System.out.print("Paste the full callback URL (or code) here: ");
        Scanner scanner = new Scanner(System.in, StandardCharsets.UTF_8);
        String callbackUrl = scanner.nextLine();
        OAuth2Token token = oauth2.exchangeCode(extractAuthorizationCode(callbackUrl));
        return token.getAccessToken();
    }

    public static void main(String[] args) throws Exception {
        List<String> scopes = Arrays.asList("bookmark.read", "tweet.read", "users.read", "offline.access");
        String accessToken = resolveAccessToken(scopes);

        try (XClient client = new XClient(XClientConfig.builder().accessToken(accessToken).build())) {
            String userId = client.users().getMe().getData().getId();
            UsersClient.GetBookmarksOptions options = UsersClient.GetBookmarksOptions.builder()
                    .maxResults(100)
                    .postFields(Arrays.asList("created_at"));

            List<Schemas.Post> allBookmarks = new ArrayList<>();
            for (Schemas.GetUsersBookmarksResponse page : client.users().getBookmarksPages(userId, options)) {
                if (page.getData() != null) {
                    allBookmarks.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " bookmarks (total: " + allBookmarks.size() + ")");
                }
            }
            System.out.println("Total Bookmarks: " + allBookmarks.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allBookmarks.subList(0, Math.min(5, allBookmarks.size()))));
        }
    }
}
