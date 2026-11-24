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
 * Quote Posts Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/:id/quote_tweets
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/quote-tweets/api-reference/get-tweets-id-quote_tweets
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetQuotedPosts {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String postId = "1409931481552543749";
            PostsClient.GetQuotedOptions options = PostsClient.GetQuotedOptions.builder()
                    .maxResults(100)
                    .postFields(Arrays.asList("created_at"));

            List<Schemas.Post> allPosts = new ArrayList<>();
            for (Schemas.GetPostsQuotedPostsResponse page : client.posts().getQuotedPages(postId, options)) {
                if (page.getData() != null) {
                    allPosts.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " posts (total: " + allPosts.size() + ")");
                }
            }
            System.out.println("Total Quote Posts: " + allPosts.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allPosts.subList(0, Math.min(5, allPosts.size()))));
        }
    }
}
