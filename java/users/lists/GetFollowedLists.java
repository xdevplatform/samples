package users.lists;

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
 * User Followed Lists Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/users/:id/followed_lists
 * Docs: https://developer.x.com/en/docs/twitter-api/lists/list-follows/api-reference/get-users-id-followed_lists
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetFollowedLists {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String userId = "user-id";
            UsersClient.GetFollowedListsOptions options = UsersClient.GetFollowedListsOptions.builder()
                    .maxResults(100)
                    .listFields(Arrays.asList("created_at", "follower_count"));

            List<Schemas.XList> allLists = new ArrayList<>();
            for (Schemas.GetUsersFollowedListsResponse page : client.users().getFollowedListsPages(userId, options)) {
                if (page.getData() != null) {
                    allLists.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " lists (total: " + allLists.size() + ")");
                }
            }
            System.out.println("Total Followed Lists: " + allLists.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allLists.subList(0, Math.min(5, allLists.size()))));
        }
    }
}
