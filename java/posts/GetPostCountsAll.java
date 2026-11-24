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
 * Full-Archive Post Counts - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/counts/all
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/counts/api-reference/get-tweets-counts-all
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetPostCountsAll {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String query = "from:XDevelopers";
            PostsClient.GetCountsAllOptions options = PostsClient.GetCountsAllOptions.builder().granularity("day");

            List<Schemas.GetPostsCountsAllResponseData> allCounts = new ArrayList<>();
            for (Schemas.GetPostsCountsAllResponse page : client.posts().getCountsAllPages(query, options)) {
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
