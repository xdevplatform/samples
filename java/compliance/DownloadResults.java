package compliance;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

/**
 * Download Compliance Results - X API v2
 *
 * Endpoint: GET <download_url> (pre-signed URL from compliance job status)
 * Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/get-compliance-jobs-id
 */
public class DownloadResults {
    public static void main(String[] args) throws Exception {
        String downloadUrl = System.getenv().getOrDefault("COMPLIANCE_DOWNLOAD_URL", "https://example.com/download");
        HttpClient http = HttpClient.newHttpClient();
        HttpRequest req = HttpRequest.newBuilder(URI.create(downloadUrl)).GET().build();
        HttpResponse<String> response = http.send(req, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response code: " + response.statusCode());
        if (response.statusCode() != 200) {
            throw new IllegalStateException("Download failed with status " + response.statusCode() + ": " + response.body());
        }
        for (String line : response.body().lines().toList()) {
            if (!line.isBlank()) {
                System.out.println(line);
            }
        }
    }
}
