# Java Samples for X API v2 (`com.x:xdk`)

Official Java 17+ sample code for the X API v2 powered by the official [**XDK for Java** (`com.x:xdk`)](https://github.com/xdevplatform/xdk-java).

## Prerequisites

- **Java 17+** (`java -version`)
- **Apache Maven 3.9+** (`mvn -version`)
- An [X Developer Account](https://console.x.com) with API credentials

## Installation

Add `com.x:xdk` to your `pom.xml` (already configured in [`java/pom.xml`](./pom.xml)):

```xml
<dependency>
    <groupId>com.x</groupId>
    <artifactId>xdk</artifactId>
    <version>[0.1.0,)</version>
</dependency>
```

Or with Gradle (`build.gradle.kts`):

```kotlin
dependencies {
    implementation("com.x:xdk:0.1.+")
}
```

Compile all 80 samples at once:

```bash
cd java
mvn compile
```

## Authentication

### Bearer Token (App-Only Endpoints)

```bash
export BEARER_TOKEN="your_bearer_token"
mvn compile exec:java -Dexec.mainClass="posts.SearchRecent"
```

### OAuth 2.0 PKCE (User-Context Endpoints)

Samples that act on behalf of a user (creating posts, managing lists/bookmarks/likes/DMs, media upload) support either a pre-generated `ACCESS_TOKEN` or interactive OAuth 2.0 PKCE via `CLIENT_ID` (and optional `CLIENT_SECRET`):

```bash
export CLIENT_ID="your_oauth2_client_id"
export CLIENT_SECRET="your_oauth2_client_secret"   # optional for public clients
export REDIRECT_URI="https://example.com"          # must match your App settings

mvn compile exec:java -Dexec.mainClass="posts.CreatePost"
```

## Sample Categories (80 Samples)

| Category | Samples | Example Command |
|---|---:|---|
| `activity/` | 5 | `mvn compile exec:java -Dexec.mainClass="activity.ListSubscriptions"` |
| `compliance/` | 5 | `mvn compile exec:java -Dexec.mainClass="compliance.GetJobs"` |
| `direct_messages/` | 6 | `mvn compile exec:java -Dexec.mainClass="direct_messages.GetUserConversationEvents"` |
| `lists/` | 9 | `mvn compile exec:java -Dexec.mainClass="lists.GetListById"` |
| `media/` | 2 | `mvn compile exec:java -Dexec.mainClass="media.MediaUploadV2"` |
| `posts/` | 12 | `mvn compile exec:java -Dexec.mainClass="posts.SearchRecent"` |
| `spaces/` | 2 | `mvn compile exec:java -Dexec.mainClass="spaces.SearchSpaces"` |
| `streams/` | 2 | `mvn compile exec:java -Dexec.mainClass="streams.StreamPostsFiltered"` |
| `usage/` | 1 | `mvn compile exec:java -Dexec.mainClass="usage.GetUsage"` |
| `users/` | 31 | `mvn compile exec:java -Dexec.mainClass="users.GetUsersByUsernames"` |
| `webhooks/` | 5 | `mvn compile exec:java -Dexec.mainClass="webhooks.ListWebhooks"` |

## Key SDK Patterns

### Automatic Cursor Pagination

Every paginated endpoint exposes a `*Pages(...)` helper returning `Paginator<T> implements Iterable<T>`:

```java
PostsClient.SearchRecentOptions options = PostsClient.SearchRecentOptions.builder()
        .maxResults(100)
        .postFields(List.of("author_id", "created_at"));

for (Schemas.SearchPostsRecentResponse page : client.posts().searchRecentPages("from:XDevelopers", options)) {
    if (page.getData() != null) {
        page.getData().forEach(post -> System.out.println(post.getId() + ": " + post.getText()));
    }
}
```

### Real-Time Streaming

Streaming endpoints return `EventStream<T> implements Iterable<T>, AutoCloseable`:

```java
try (EventStream<Schemas.StreamPostsResponse> stream = client.stream().posts()) {
    for (Schemas.StreamPostsResponse event : stream) {
        System.out.println(event.getData());
    }
}
```
