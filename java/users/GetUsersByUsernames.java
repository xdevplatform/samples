package users;

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
 * User Lookup by Usernames - X API v2
 *
 * Endpoint: GET https://api.x.com/2/users/by
 * Docs: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class GetUsersByUsernames {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            List<String> usernames = Arrays.asList("XDevelopers", "API");
            UsersClient.GetByUsernamesOptions options = UsersClient.GetByUsernamesOptions.builder()
                    .userFields(Arrays.asList("description", "created_at"));
            Schemas.GetUsersByUsernamesResponse response = client.users().getByUsernames(usernames, options);
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(response.getData()));
        }
    }
}
