package posts;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.x.xdk.Paginator;
import com.x.xdk.XClient;
import com.x.xdk.XClientConfig;
import com.x.xdk.clients.*;
import com.x.xdk.models.Schemas;
import com.x.xdk.streaming.EventStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Single Post Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/:id
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetPostById {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String postId = "post-id";
            PostsClient.GetByIdOptions options = PostsClient.GetByIdOptions.builder()
                    .postFields(Arrays.asList("created_at", "author_id", "lang", "source", "public_metrics", "entities"));
            Schemas.GetPostsByIdResponse response = client.posts().getById(postId, options);
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(response.getData()));
        }
    }
}
