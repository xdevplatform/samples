package streams;

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
 * Filtered Stream - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/search/stream
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class StreamPostsFiltered {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            // 1. Fetch existing rules
            Schemas.GetRulesResponse currentRules = client.stream().getRules();

            // 2. Delete existing rules by value if present
            if (currentRules.getData() != null && !currentRules.getData().isEmpty()) {
                List<String> existingValues = new ArrayList<>();
                for (Schemas.GetRulesResponseData rule : currentRules.getData()) {
                    if (rule.getValue() != null) {
                        existingValues.add(rule.getValue());
                    }
                }
                if (!existingValues.isEmpty()) {
                    client.stream().updateRules(new Schemas.UpdateRulesRequest()
                            .delete(new Schemas.UpdateRulesDelete().values(existingValues)));
                }
            }

            // 3. Add sample filter rules
            List<Schemas.UpdateRulesAdd> sampleRules = Arrays.asList(
                    new Schemas.UpdateRulesAdd().value("dog has:images").tag("dog pictures"),
                    new Schemas.UpdateRulesAdd().value("cat has:images -grumpy").tag("cat pictures"));
            Schemas.UpdateRulesResponse added = client.stream().updateRules(new Schemas.UpdateRulesRequest().add(sampleRules));
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(added.getData()));

            // 4. Stream matching posts in real time
            StreamClient.PostsOptions options = StreamClient.PostsOptions.builder()
                    .tweetFields(Arrays.asList("id", "text", "created_at"));
            try (EventStream<Schemas.StreamPostsResponse> stream = client.stream().posts(options)) {
                for (Schemas.StreamPostsResponse event : stream) {
                    if (event.getData() != null) {
                        System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(event.getData()));
                    }
                }
            }
        }
    }
}
