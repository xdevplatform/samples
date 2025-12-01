/**
 * User Lookup - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/users/by
 * Docs: https://developer.x.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by
 * 
 * Authentication: Bearer Token (App-only)
 * Required env vars: BEARER_TOKEN
 * 
 * Dependencies: org.apache.httpcomponents:httpclient, com.google.code.gson:gson
 */

import java.io.IOException;
import java.net.URISyntaxException;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class Lookup {

    public static void main(String[] args) throws IOException, URISyntaxException {
        String bearerToken = System.getenv("BEARER_TOKEN");
        
        if (bearerToken == null) {
            System.err.println("BEARER_TOKEN environment variable not set");
            System.exit(1);
        }

        String response = lookupUsers("XDevelopers,X", bearerToken);
        System.out.println(response);
    }

    private static String lookupUsers(String usernames, String bearerToken) throws IOException, URISyntaxException {
        String userLookupUrl = "https://api.x.com/2/users/by";

        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder(userLookupUrl);
        uriBuilder.addParameter("usernames", usernames);
        uriBuilder.addParameter("user.fields", "created_at,description,public_metrics");

        HttpGet httpGet = new HttpGet(uriBuilder.build());
        httpGet.setHeader("Authorization", "Bearer " + bearerToken);
        httpGet.setHeader("User-Agent", "v2UserLookupJava");

        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        
        if (entity != null) {
            return EntityUtils.toString(entity, "UTF-8");
        } else {
            return "No response";
        }
    }
}
