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
 * List Lookup by ID - X API v2
 *
 * Endpoint: GET https://api.x.com/2/lists/:id
 * Docs: https://developer.x.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetListById {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String listId = "list-id";
            ListsClient.GetByIdOptions options = ListsClient.GetByIdOptions.builder()
                    .listFields(Arrays.asList("created_at", "follower_count", "member_count", "owner_id", "description"));
            Schemas.GetListsByIdResponse response = client.lists().getById(listId, options);
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(response.getData()));
        }
    }
}
