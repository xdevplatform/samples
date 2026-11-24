package activity;

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
 * Activity Stream - X API v2
 *
 * Endpoint: GET https://api.x.com/2/activity/stream
 * Docs: https://docs.x.com/x-api/activity/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class StreamEvents {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            System.out.println("Connecting to activity stream... (press Ctrl+C to stop)");
            try (EventStream<Schemas.ActivityStreamResponse> stream = client.stream().activity()) {
                for (Schemas.ActivityStreamResponse event : stream) {
                    if (event.getData() != null) {
                        System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(event.getData()));
                    }
                }
            }
        }
    }
}
