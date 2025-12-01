# X API v2 - JavaScript (Node.js) Examples

Working JavaScript code samples for the X (formerly Twitter) API v2.

## Setup

### 1. Install Node.js 14+

```bash
node --version
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

For **Bearer Token** authentication (app-only):
```bash
export BEARER_TOKEN='your_bearer_token'
```

For **OAuth 1.0a** authentication (user context):
```bash
export CONSUMER_KEY='your_consumer_key'
export CONSUMER_SECRET='your_consumer_secret'
```

## Examples by Category

### Posts
| File | Description | Auth |
|------|-------------|------|
| `posts/create_post.js` | Create a new post | OAuth 1.0a |
| `posts/delete_post.js` | Delete a post | OAuth 1.0a |
| `posts/lookup.js` | Look up posts by ID | Bearer |
| `posts/search_recent.js` | Search recent posts (7 days) | Bearer |

### Users
| File | Description | Auth |
|------|-------------|------|
| `users/lookup.js` | Look up users by username | Bearer |
| `users/followers.js` | Get user's followers | Bearer |

### Timelines
| File | Description | Auth |
|------|-------------|------|
| `timelines/user_posts.js` | User's posts timeline | Bearer |

### Streams
| File | Description | Auth |
|------|-------------|------|
| `streams/filtered_stream.js` | Filtered stream with rules | Bearer |

### Lists
| File | Description | Auth |
|------|-------------|------|
| `lists/lookup.js` | Look up a list | Bearer |

### Spaces
| File | Description | Auth |
|------|-------------|------|
| `spaces/lookup.js` | Look up Spaces | Bearer |

## Running Examples

```bash
# Make sure environment variables are set
node posts/search_recent.js
```

## More Information

- [X API Documentation](https://developer.x.com/en/docs/twitter-api)
- [X Developer Portal](https://developer.x.com/en/portal/dashboard)
