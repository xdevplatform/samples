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
 * Post Lookup by IDs - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetPostsByIds {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            List<String> postIds = Arrays.asList("post-id-1", "post-id-2");
            PostsClient.GetByIdsOptions options = PostsClient.GetByIdsOptions.builder()
                    .postFields(Arrays.asList("created_at", "author_id", "lang", "source", "public_metrics", "context_annotations", "entities"));
            Schemas.GetPostsByIdsResponse response = client.posts().getByIds(postIds, options);
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(response.getData()));
        }
    }
}
