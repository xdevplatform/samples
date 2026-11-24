package lists;

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
 * List Members Lookup - X API v2
 *
 * Endpoint: GET https://api.x.com/2/lists/:id/members
 * Docs: https://developer.x.com/en/docs/twitter-api/lists/list-members/api-reference/get-lists-id-members
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetListMembers {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String listId = "list-id";
            ListsClient.GetMembersOptions options = ListsClient.GetMembersOptions.builder()
                    .maxResults(100)
                    .userFields(Arrays.asList("created_at", "description", "verified"));

            List<Schemas.User> allUsers = new ArrayList<>();
            for (Schemas.GetListsMembersResponse page : client.lists().getMembersPages(listId, options)) {
                if (page.getData() != null) {
                    allUsers.addAll(page.getData());
                    System.out.println("Fetched " + page.getData().size() + " users (total: " + allUsers.size() + ")");
                }
            }
            System.out.println("Total Members: " + allUsers.size());
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(allUsers.subList(0, Math.min(5, allUsers.size()))));
        }
    }
}
