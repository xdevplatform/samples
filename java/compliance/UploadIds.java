package compliance;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Path;

/**
 * Upload IDs for Compliance Job - X API v2
 *
 * Endpoint: PUT <upload_url> (pre-signed URL from compliance job creation)
 * Docs: https://developer.x.com/en/docs/twitter-api/compliance/batch-compliance/api-reference/post-compliance-jobs
 */
public class UploadIds {
    public static void main(String[] args) throws Exception {
        String uploadUrl = System.getenv().getOrDefault("COMPLIANCE_UPLOAD_URL", "https://example.com/upload");
        Path idsFile = Path.of(System.getenv().getOrDefault("COMPLIANCE_IDS_FILE", "ids.txt"));

        HttpClient http = HttpClient.newHttpClient();
        HttpRequest req = HttpRequest.newBuilder(URI.create(uploadUrl))
                .header("Content-Type", "text/plain")
                .PUT(HttpRequest.BodyPublishers.ofFile(idsFile))
                .build();
        HttpResponse<String> response = http.send(req, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response code: " + response.statusCode());
        if (response.statusCode() != 200) {
            throw new IllegalStateException("Upload failed with status " + response.statusCode() + ": " + response.body());
        }
        System.out.println(response.body());
    }
}
