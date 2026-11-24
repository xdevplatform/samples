# C# / .NET Samples for X API v2 (`XDevPlatform.Xdk`)

Official C# / .NET 8+ sample code for the X API v2 powered by the official [**XDK for C#** (`XDevPlatform.Xdk`)](https://github.com/xdevplatform/xdk-csharp).

## Prerequisites

- **.NET 8.0 SDK or later** (`dotnet --version`)
- An [X Developer Account](https://console.x.com) with API credentials

## Installation

Add `XDevPlatform.Xdk` to your project (already configured in [`csharp/XdkSamples.csproj`](./XdkSamples.csproj)):

```bash
dotnet add package XDevPlatform.Xdk
```

Build all 80 samples at once:

```bash
cd csharp
dotnet build
```

List all available samples:

```bash
dotnet run -- --help
```

## Authentication

### Bearer Token (App-Only Endpoints)

```bash
export BEARER_TOKEN="your_bearer_token"
dotnet run -- posts/search_recent
```

### OAuth 2.0 PKCE (User-Context Endpoints)

Samples that act on behalf of a user (creating posts, managing lists/bookmarks/likes/DMs, media upload) support either a pre-generated `ACCESS_TOKEN` or interactive OAuth 2.0 PKCE via `CLIENT_ID` (and optional `CLIENT_SECRET`):

```bash
export CLIENT_ID="your_oauth2_client_id"
export CLIENT_SECRET="your_oauth2_client_secret"   # optional for public clients
export REDIRECT_URI="https://example.com"          # must match your App settings

dotnet run -- posts/create_post
```

## Sample Categories (80 Samples)

| Category | Samples | Example Command |
|---|---:|---|
| `activity/` | 5 | `dotnet run -- activity/list_subscriptions` |
| `compliance/` | 5 | `dotnet run -- compliance/get_jobs` |
| `direct_messages/` | 6 | `dotnet run -- direct_messages/get_user_conversation_events` |
| `lists/` | 9 | `dotnet run -- lists/get_list_by_id` |
| `media/` | 2 | `dotnet run -- media/media_upload_v2` |
| `posts/` | 12 | `dotnet run -- posts/search_recent` |
| `spaces/` | 2 | `dotnet run -- spaces/search_spaces` |
| `streams/` | 2 | `dotnet run -- streams/stream_posts_filtered` |
| `usage/` | 1 | `dotnet run -- usage/get_usage` |
| `users/` | 31 | `dotnet run -- users/get_users_by_usernames` |
| `webhooks/` | 5 | `dotnet run -- webhooks/list_webhooks` |

## Key SDK Patterns

### Async Cursor Pagination (`IAsyncEnumerable<T>`)

Every paginated endpoint exposes a `*Pages(...)` helper returning `Paginator<T> : IAsyncEnumerable<T>`:

```csharp
var options = new PostsClient.SearchRecentOptions
{
    MaxResults = 100,
    PostFields = new List<string> { "author_id", "created_at" },
};

await foreach (var page in client.Posts.SearchRecentPages("from:XDevelopers", options))
{
    foreach (var post in page.Data ?? Enumerable.Empty<Post>())
    {
        Console.WriteLine($"{post.Id}: {post.Text}");
    }
}
```

### Real-Time NDJSON Streaming (`EventStream<T>`)

Streaming endpoints return `EventStream<T> : IAsyncEnumerable<T>, IAsyncDisposable`:

```csharp
await using var stream = client.Stream.PostsStream();
await foreach (var evt in stream)
{
    Console.WriteLine(evt.Data?.Text);
}
```
