# X API v2 - Java Examples

Working Java code samples for the X (formerly Twitter) API v2.

## Setup

### 1. Install Java 11+

```bash
java --version
```

### 2. Add dependencies

Using Maven, add to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.httpcomponents</groupId>
        <artifactId>httpclient</artifactId>
        <version>4.5.13</version>
    </dependency>
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.9.1</version>
    </dependency>
</dependencies>
```

### 3. Set environment variables

For **Bearer Token** authentication (app-only):
```bash
export BEARER_TOKEN='your_bearer_token'
```

## Examples by Category

### Posts
| File | Description | Auth |
|------|-------------|------|
| `posts/SearchRecent.java` | Search recent posts (7 days) | Bearer |

### Users
| File | Description | Auth |
|------|-------------|------|
| `users/Lookup.java` | Look up users by username | Bearer |

## Building and Running

```bash
# Compile
javac -cp ".:lib/*" posts/SearchRecent.java

# Run
java -cp ".:lib/*" SearchRecent
```

## More Information

- [X API Documentation](https://developer.x.com/en/docs/twitter-api)
- [X Developer Portal](https://developer.x.com/en/portal/dashboard)
