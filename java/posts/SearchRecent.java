/**
 * Recent Search - X API v2
 * 
 * Endpoint: GET https://api.x.com/2/tweets/search/recent
 * Docs: https://developer.x.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
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

public class SearchRecent {

    public static void main(String[] args) throws IOException, URISyntaxException {
        String bearerToken = System.getenv("BEARER_TOKEN");
        
        if (bearerToken == null) {
            System.err.println("BEARER_TOKEN environment variable not set");
            System.exit(1);
        }

        String response = search("from:XDevelopers -is:retweet", bearerToken);
        System.out.println(response);
    }

    private static String search(String query, String bearerToken) throws IOException, URISyntaxException {
        String searchUrl = "https://api.x.com/2/tweets/search/recent";

        HttpClient httpClient = HttpClients.custom()
                .setDefaultRequestConfig(RequestConfig.custom()
                        .setCookieSpec(CookieSpecs.STANDARD).build())
                .build();

        URIBuilder uriBuilder = new URIBuilder(searchUrl);
        uriBuilder.addParameter("query", query);
        uriBuilder.addParameter("tweet.fields", "author_id,created_at");

        HttpGet httpGet = new HttpGet(uriBuilder.build());
        httpGet.setHeader("Authorization", "Bearer " + bearerToken);
        httpGet.setHeader("User-Agent", "v2RecentSearchJava");

        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();
        
        if (entity != null) {
            return EntityUtils.toString(entity, "UTF-8");
        } else {
            return "No response";
        }
    }
}
