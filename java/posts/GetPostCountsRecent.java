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
 * Recent Post Counts - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/counts/recent
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/counts/api-reference/get-tweets-counts-recent
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetPostCountsRecent {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String query = "from:XDevelopers";
            PostsClient.GetCountsRecentOptions options = PostsClient.GetCountsRecentOptions.builder().granularity("day");

            List<Schemas.GetPostsCountsRecentResponseData> allCounts = new ArrayList<>();
            for (Schemas.GetPostsCountsRecentResponse page : client.posts().getCountsRecentPages(query, options)) {
                if (page.getData() != null) {
                    allCounts.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " count buckets (total: " + allCounts.size() + ")");
                }
            }
            System.out.println("Total Count Buckets: " + allCounts.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allCounts));
        }
    }
}
