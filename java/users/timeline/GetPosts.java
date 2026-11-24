package users.timeline;

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
 * User Posts Timeline - X API v2
 *
 * Endpoint: GET https://api.x.com/2/users/:id/tweets
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetPosts {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String userId = "2244994945";
            UsersClient.GetPostsOptions options = UsersClient.GetPostsOptions.builder()
                    .maxResults(100)
                    .postFields(Arrays.asList("created_at"));

            List<Schemas.Post> allPosts = new ArrayList<>();
            for (Schemas.GetUsersPostsResponse page : client.users().getPostsPages(userId, options)) {
                if (page.getData() != null) {
                    allPosts.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " posts (total: " + allPosts.size() + ")");
                }
            }
            System.out.println("Total Posts: " + allPosts.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allPosts.subList(0, Math.min(5, allPosts.size()))));
        }
    }
}
