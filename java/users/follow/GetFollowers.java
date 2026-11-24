package users.follow;

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
 * User Followers Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/users/:id/followers
 * Docs: https://developer.x.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-followers
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetFollowers {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String userId = "2244994945";
            UsersClient.GetFollowersOptions options = UsersClient.GetFollowersOptions.builder()
                    .maxResults(100)
                    .userFields(Arrays.asList("created_at"));

            List<Schemas.User> allUsers = new ArrayList<>();
            for (Schemas.GetUsersFollowersResponse page : client.users().getFollowersPages(userId, options)) {
                if (page.getData() != null) {
                    allUsers.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " users (total: " + allUsers.size() + ")");
                }
            }
            System.out.println("Total Followers: " + allUsers.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allUsers.subList(0, Math.min(5, allUsers.size()))));
        }
    }
}
