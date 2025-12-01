# X API v2 Sample Code

[![X API v2](https://img.shields.io/endpoint?url=https%3A%2F%2Ftwbadges.glitch.me%2Fbadges%2Fv2)](https://developer.x.com/en/docs/twitter-api)

Working code samples for the **X (formerly Twitter) API v2** in Python, JavaScript, Ruby, and Java.

## 📁 Repository Structure

```
├── python/           # Python examples (most complete)
├── javascript/       # JavaScript (Node.js) examples
├── ruby/             # Ruby examples
├── java/             # Java examples
├── llms.txt          # LLM-friendly documentation
└── api-index.json    # Machine-readable endpoint catalog
```

## 🚀 Quick Start

### 1. Get API Credentials

Sign up at the [X Developer Portal](https://developer.x.com/en/portal/dashboard) and create a project/app.

### 2. Set Environment Variables

```bash
# For app-only authentication (read-only endpoints)
export BEARER_TOKEN='your_bearer_token'

# For user context authentication (actions on behalf of users)
export CONSUMER_KEY='your_consumer_key'
export CONSUMER_SECRET='your_consumer_secret'
```

### 3. Choose Your Language

| Language | Setup | Run Example |
|----------|-------|-------------|
| **Python** | `pip install -r python/requirements.txt` | `python python/posts/search_recent.py` |
| **JavaScript** | `cd javascript && npm install` | `node javascript/posts/search_recent.js` |
| **Ruby** | `gem install typhoeus` | `ruby ruby/posts/search_recent.rb` |
| **Java** | Add dependencies (see java/README.md) | `javac && java SearchRecent` |

## 📚 Available Examples

### Posts (formerly Tweets)

| Operation | Python | JavaScript | Ruby | Java |
|-----------|--------|------------|------|------|
| Create Post | ✅ | ✅ | | |
| Delete Post | ✅ | ✅ | | |
| Lookup Posts | ✅ | ✅ | ✅ | |
| Search Recent | ✅ | ✅ | ✅ | ✅ |
| Search Full Archive | ✅ | | | |
| Post Counts | ✅ | | | |
| Quote Posts | ✅ | | | |
| Repost | ✅ | | | |
| Like/Unlike | ✅ | | | |

### Users

| Operation | Python | JavaScript | Ruby | Java |
|-----------|--------|------------|------|------|
| Lookup Users | ✅ | ✅ | ✅ | ✅ |
| Get Me | ✅ | | | |
| Followers | ✅ | ✅ | ✅ | |
| Following | ✅ | | | |
| Block/Unblock | ✅ | | | |
| Mute/Unmute | ✅ | | | |

### Timelines

| Operation | Python | JavaScript | Ruby |
|-----------|--------|------------|------|
| User Posts | ✅ | ✅ | ✅ |
| User Mentions | ✅ | | |
| Home Timeline | ✅ | | |

### Streams

| Operation | Python | JavaScript |
|-----------|--------|------------|
| Filtered Stream | ✅ | ✅ |
| Sampled Stream | ✅ | |

### Other

| Category | Python | JavaScript | Ruby |
|----------|--------|------------|------|
| Bookmarks | ✅ | | |
| Spaces | ✅ | ✅ | |
| Lists | ✅ | ✅ | ✅ |
| Direct Messages | ✅ | | |
| Media Upload | ✅ | | |
| Compliance | ✅ | | |
| Usage Stats | ✅ | | |

## 🔐 Authentication Types

| Type | Use Case | Required Env Vars |
|------|----------|-------------------|
| **Bearer Token** | Read-only endpoints (search, lookup) | `BEARER_TOKEN` |
| **OAuth 1.0a** | User actions (post, like, follow) | `CONSUMER_KEY`, `CONSUMER_SECRET` |
| **OAuth 2.0 PKCE** | Newer endpoints (bookmarks) | OAuth flow required |

## 🔗 Resources

- [X API Documentation](https://developer.x.com/en/docs/twitter-api)
- [Developer Portal](https://developer.x.com/en/portal/dashboard)
- [API Reference Index](https://developer.x.com/en/docs/api-reference-index)
- [Postman Collection](https://t.co/twitter-api-postman)

## 🤖 For LLMs

This repository includes:
- **`llms.txt`** - Comprehensive context file for AI assistants
- **`api-index.json`** - Machine-readable endpoint catalog

## 🤝 Contributing

We welcome contributions! Please:
1. Follow existing code patterns
2. Include proper documentation headers
3. Test your examples before submitting

## 📄 License

Apache 2.0 - See [LICENSE](LICENSE)
