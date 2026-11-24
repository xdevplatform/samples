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
 * Create Activity Subscription - X API v2
 *
 * Endpoint: POST https://api.x.com/2/activity/subscriptions
 * Docs: https://docs.x.com/x-api/activity/introduction
 *
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 */
public class CreateSubscription {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static void main(String[] args) throws Exception {
        String bearerToken = System.getenv("BEARER_TOKEN");
        if (bearerToken == null || bearerToken.isBlank()) {
            throw new IllegalStateException("BEARER_TOKEN environment variable is not set");
        }

        try (XClient client = new XClient(XClientConfig.builder().bearerToken(bearerToken).build())) {
            String userId = "2244994945";
            String eventType = "profile.update.bio";

            Schemas.CreateActivitySubscriptionFilter filter = new Schemas.CreateActivitySubscriptionFilter()
                    .userId(userId);
            Schemas.CreateActivitySubscriptionRequest request = new Schemas.CreateActivitySubscriptionRequest()
                    .eventType(eventType)
                    .filter(filter)
                    .tag(eventType + " for user " + userId);

            Schemas.CreateActivitySubscriptionResponse response = client.activity().createSubscription(request);
            System.out.println(MAPPER.writerWithDefaultPrettyPrinter().writeValueAsString(response.getData()));
        }
    }
}
