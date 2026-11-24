package spaces;

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
 * Search Spaces - X API v2
 *
 * Endpoint: GET https://api.x.com/2/spaces/search
 * Docs: https://developer.x.com/en/docs/twitter-api/spaces/search/api-reference/get-spaces-search
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class SearchSpaces {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String searchTerm = "NBA";
            SpacesClient.SearchOptions options = SpacesClient.SearchOptions.builder()
                    .spaceFields(Arrays.asList("title", "created_at"))
                    .expansions(Arrays.asList("creator_id"));
            Schemas.SearchSpacesResponse response = client.spaces().search(searchTerm, options);
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(response.getData()));
        }
    }
}
