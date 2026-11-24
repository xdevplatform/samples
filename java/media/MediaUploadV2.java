package media;

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
 * Media Upload v2 (Chunked Video Upload) - X API v2
 *
 * Endpoint: POST https://api.x.com/2/media/upload/initialize | append | finalize
 * Docs: https://developer.x.com/en/docs/twitter-api/media/upload-media/api-reference
 *
 * Authentication: OAuth 2.0 PKCE (User Context)
 * Required env vars: CLIENT_ID, CLIENT_SECRET (or ACCESS_TOKEN)
 */
public class MediaUploadV2 {
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
        List<String> scopes = Arrays.asList("media.write", "users.read", "tweet.read", "tweet.write", "offline.access");
        String accessToken = resolveAccessToken(scopes);

        try (XClient client = new XClient(XClientConfig.builder().accessToken(accessToken).build())) {
            Path videoPath = Path.of(System.getenv().getOrDefault("VIDEO_FILE", "path/to/your/video.mp4"));
            byte[] allBytes = Files.readAllBytes(videoPath);

            // 1. Initialize chunked upload
            Schemas.InitializeMediaUploadResponse initRes = client.media().initializeUpload(
                    new Schemas.InitializeMediaUploadRequest()
                            .mediaType("video/mp4")
                            .mediaCategory("tweet_video")
                            .totalBytes((long) allBytes.length));
            String mediaId = initRes.getData().getId();
            System.out.println("Initialized upload for mediaId: " + mediaId);

            // 2. Append 4 MiB chunks
            int chunkSize = 4 * 1024 * 1024;
            int segmentIndex = 0;
            for (int offset = 0; offset < allBytes.length; offset += chunkSize) {
                int end = Math.min(offset + chunkSize, allBytes.length);
                byte[] chunk = Arrays.copyOfRange(allBytes, offset, end);
                client.media().appendUpload(
                        mediaId,
                        new Schemas.AppendMediaUploadRequest()
                                .segmentIndex(segmentIndex++)
                                .media(Base64.getEncoder().encodeToString(chunk)));
                System.out.println("Uploaded " + end + " / " + allBytes.length + " bytes");
            }

            // 3. Finalize & poll processing status
            Schemas.FinalizeMediaUploadResponse finRes = client.media().finalizeUpload(mediaId);
            Schemas.FinalizeMediaUploadResponseDataProcessingInfo proc =
                    finRes.getData() != null ? finRes.getData().getProcessingInfo() : null;
            while (proc != null && proc.getState() != null
                    && !"succeeded".equals(proc.getState()) && !"failed".equals(proc.getState())) {
                long waitSecs = proc.getCheckAfterSecs() != null ? proc.getCheckAfterSecs() : 2L;
                Thread.sleep(waitSecs * 1000L);
                Schemas.GetMediaUploadStatusResponse statusRes = client.media().getUploadStatus(
                        mediaId, MediaClient.GetUploadStatusOptions.builder().command("STATUS"));
                Schemas.GetMediaUploadStatusResponseDataProcessingInfo nextProc =
                        statusRes.getData() != null ? statusRes.getData().getProcessingInfo() : null;
                if (nextProc == null) {
                    break;
                }
                proc = new Schemas.FinalizeMediaUploadResponseDataProcessingInfo()
                        .state(nextProc.getState())
                        .checkAfterSecs(nextProc.getCheckAfterSecs());
            }

            // 4. Create post with attached video
            Schemas.CreatePostsResponse postRes = client.posts().create(
                    new Schemas.CreatePostsRequest()
                            .text("Uploaded a video using XDK for Java!")
                            .media(new Schemas.CreatePostsMedia().mediaIds(Arrays.asList(mediaId))));
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(postRes.getData()));
        }
    }
}
