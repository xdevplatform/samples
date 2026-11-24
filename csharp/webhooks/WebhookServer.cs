using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Samples.Webhooks;

/// <summary>
/// Webhook Server (CRC + Event Delivery) - X API v2
/// Docs: https://docs.x.com/x-api/webhooks/introduction
/// Required env vars: CONSUMER_SECRET
/// </summary>
public static class WebhookServer
{
    public static async Task RunAsync()
    {
        var consumerSecret = Environment.GetEnvironmentVariable("CONSUMER_SECRET");
        if (string.IsNullOrWhiteSpace(consumerSecret))
        {
            throw new InvalidOperationException("CONSUMER_SECRET environment variable is not set");
        }

        using var listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/webhooks/");
        listener.Start();
        Console.WriteLine("Listening on http://localhost:8080/webhooks/");

        while (listener.IsListening)
        {
            var context = await listener.GetContextAsync();
            var request = context.Request;
            var response = context.Response;

            if (string.Equals(request.HttpMethod, "GET", StringComparison.OrdinalIgnoreCase))
            {
                var crcToken = request.QueryString["crc_token"];
                if (string.IsNullOrEmpty(crcToken))
                {
                    response.StatusCode = 400;
                    var errBytes = Encoding.UTF8.GetBytes("{\"error\":\"No crc_token\"}");
                    response.ContentType = "application/json";
                    await response.OutputStream.WriteAsync(errBytes);
                    response.Close();
                    continue;
                }

                using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(consumerSecret));
                var digest = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(crcToken)));
                var bodyBytes = Encoding.UTF8.GetBytes($"{{\"response_token\":\"sha256={digest}\"}}");
                response.StatusCode = 200;
                response.ContentType = "application/json";
                await response.OutputStream.WriteAsync(bodyBytes);
                response.Close();
            }
            else if (string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
            {
                using var reader = new StreamReader(request.InputStream, Encoding.UTF8);
                var payload = await reader.ReadToEndAsync();
                Console.WriteLine(payload);
                response.StatusCode = 200;
                response.Close();
            }
            else
            {
                response.StatusCode = 405;
                response.Close();
            }
        }
    }
}
