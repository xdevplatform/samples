package webhooks;

import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * Webhook Server (CRC + Event Delivery) - X API v2
 *
 * Docs: https://docs.x.com/x-api/webhooks/introduction
 * Required env vars: CONSUMER_SECRET
 */
public class WebhookServer {
    public static void main(String[] args) throws Exception {
        String consumerSecret = System.getenv("CONSUMER_SECRET");
        if (consumerSecret == null || consumerSecret.isBlank()) {
            throw new IllegalStateException("CONSUMER_SECRET environment variable is not set");
        }

        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", 8080), 0);
        server.createContext("/webhooks", exchange -> {
            String method = exchange.getRequestMethod();
            if ("GET".equalsIgnoreCase(method)) {
                String query = exchange.getRequestURI().getRawQuery();
                String crcToken = null;
                if (query != null) {
                    for (String pair : query.split("&")) {
                        String[] kv = pair.split("=", 2);
                        if (kv.length == 2 && "crc_token".equals(kv[0])) {
                            crcToken = URLDecoder.decode(kv[1], StandardCharsets.UTF_8);
                        }
                    }
                }
                if (crcToken == null) {
                    byte[] err = "{\"error\":\"No crc_token\"}".getBytes(StandardCharsets.UTF_8);
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(400, err.length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(err);
                    }
                    return;
                }
                try {
                    Mac mac = Mac.getInstance("HmacSHA256");
                    mac.init(new SecretKeySpec(consumerSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
                    String digest = Base64.getEncoder().encodeToString(mac.doFinal(crcToken.getBytes(StandardCharsets.UTF_8)));
                    byte[] body = ("{\"response_token\":\"sha256=" + digest + "\"}").getBytes(StandardCharsets.UTF_8);
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, body.length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(body);
                    }
                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                }
            } else if ("POST".equalsIgnoreCase(method)) {
                String payload = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                System.out.println(payload);
                exchange.sendResponseHeaders(200, -1);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        });

        System.out.println("Listening on http://0.0.0.0:8080/webhooks");
        server.start();
    }
}
