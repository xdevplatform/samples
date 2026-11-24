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
 * Sampled Stream (1% Volume) - X API v2
 *
 * Endpoint: GET https://api.x.com/2/tweets/sample/stream
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/volume-streams/api-reference/get-tweets-sample-stream
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class StreamPostsSample {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            try (EventStream<Schemas.StreamPostsSampleResponse> stream = client.stream().postsSample()) {
                for (Schemas.StreamPostsSampleResponse event : stream) {
                    if (event.getData() != null) {
                        System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(event.getData()));
                    }
                }
            }
        }
    }
}
