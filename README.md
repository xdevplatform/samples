# X API v2 Sample Code

[![X API v2](https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fv2)](https://developer.x.com/en/docs/twitter-api)

Official sample code for the **X API v2** across **Python**, **JavaScript / TypeScript**, **Java**, **C# / .NET**, **Ruby**, and **R**.

First-party SDK samples use the official **XDK** libraries:
- **Python**: [`xdk`](https://pypi.org/project/xdk/) ([`xdevplatform/xdk-python`](https://github.com/xdevplatform/xdk-python))
- **JavaScript / TypeScript**: [`@xdevplatform/xdk`](https://www.npmjs.com/package/@xdevplatform/xdk) ([`xdevplatform/xdk-typescript`](https://github.com/xdevplatform/xdk-typescript))
- **Java**: [`com.x:xdk`](https://central.sonatype.com/artifact/com.x/xdk) ([`xdevplatform/xdk-java`](https://github.com/xdevplatform/xdk-java))
- **C# / .NET**: [`XDevPlatform.Xdk`](https://www.nuget.org/packages/XDevPlatform.Xdk) ([`xdevplatform/xdk-csharp`](https://github.com/xdevplatform/xdk-csharp))

## Repository Structure

```
├── python/           # 80 Python samples (xdk)
├── javascript/       # 84 JavaScript / Node.js samples (@xdevplatform/xdk)
├── java/             # 80 Java 17+ samples (com.x:xdk)
├── csharp/           # 80 C# / .NET 8+ samples (XDevPlatform.Xdk)
├── ruby/             # 58 Ruby samples
├── r/                # 5 R samples
├── llms.txt          # LLM-friendly documentation & SDK conventions
└── api-index.json    # Machine-readable endpoint-to-sample catalog
```

## Quick Start

### 1. Get API Credentials

Sign up and create an App in the [X Developer Console](https://console.x.com).

### 2. Set Environment Variables

**For App-only read operations (search, lookup, streams, webhooks, activity):**
```bash
export BEARER_TOKEN='your_bearer_token'
```

**For User-context actions (post, like, repost, bookmark, DMs, media upload, etc.):**
```bash
export CLIENT_ID='your_oauth2_client_id'
export CLIENT_SECRET='your_oauth2_client_secret'
```

### 3. Run an Example

```bash
# Python (xdk)
cd python && pip install xdk
python posts/search_recent.py

# JavaScript / Node.js (@xdevplatform/xdk)
cd javascript && npm install
node posts/search_recent.js

# Java 17+ (com.x:xdk)
cd java
mvn compile exec:java -Dexec.mainClass="posts.SearchRecent"

# C# / .NET 8+ (XDevPlatform.Xdk)
cd csharp
dotnet run -- posts/search_recent

# Ruby
cd ruby && bundle install
ruby posts/search_recent.rb
```

## Coverage by Category

| Category | Python (`xdk`) | JavaScript (`@xdevplatform/xdk`) | Java (`com.x:xdk`) | C# (`XDevPlatform.Xdk`) | Ruby | R |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Activity (subscriptions & stream) | ✅ | ✅ | ✅ | ✅ | | |
| Compliance (batch jobs) | ✅ | ✅ | ✅ | ✅ | | |
| Direct Messages (1:1 & group DMs) | ✅ | ✅ | ✅ | ✅ | | |
| Lists (CRUD, members, followers, posts) | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Media Upload (single & chunked v2) | ✅ | ✅ | ✅ | ✅ | | |
| Posts (search, counts, create, delete, hide reply, quotes) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Spaces (lookup & search) | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Streams (filtered rules & 1% sampled) | ✅ | ✅ | ✅ | ✅ | ✅ | |
| Usage (daily Post usage) | ✅ | ✅ | ✅ | ✅ | | |
| Users (lookup, timelines, likes, bookmarks, follows, mutes, blocks, reposts) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Webhooks (register, list, validate CRC, delete, server) | ✅ | ✅ | ✅ | ✅ | | |

## Authentication

| Type | Use Case | Env Vars |
|------|----------|----------|
| Bearer Token | App-only endpoints (search, lookup, streams, webhooks, activity) | `BEARER_TOKEN` |
| OAuth 2.0 PKCE | User-context actions (post, like, repost, bookmark, mute, follow, DMs, media) | `CLIENT_ID`, `CLIENT_SECRET` (or `ACCESS_TOKEN`) |
| Webhook HMAC | Webhook CRC verification (`webhook_server`) | `CONSUMER_SECRET` |

## For LLMs & Tooling

- **`llms.txt`** - Concise context file covering SDK packages, auth patterns, pagination, and streaming across all languages
- **`api-index.json`** - Machine-readable catalog mapping every endpoint to its exact file path in `python/`, `javascript/`, `java/`, `csharp/`, `ruby/`, and `r/`

## Resources

- [X Developer Documentation](https://docs.x.com)
- [X Developer Console](https://console.x.com)
- [XDK Generator Monorepo (`xdevplatform/xdk`)](https://github.com/xdevplatform/xdk)

## License

Apache 2.0
