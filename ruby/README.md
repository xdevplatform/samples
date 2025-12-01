# X API v2 - Ruby Examples

Working Ruby code samples for the X (formerly Twitter) API v2.

## Setup

### 1. Install Ruby 2.7+

```bash
ruby --version
```

### 2. Install dependencies

```bash
gem install typhoeus
gem install oauth  # For OAuth 1.0a examples
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
| `posts/search_recent.rb` | Search recent posts (7 days) | Bearer |
| `posts/lookup.rb` | Look up posts by ID | Bearer |

### Users
| File | Description | Auth |
|------|-------------|------|
| `users/lookup.rb` | Look up users by username | Bearer |
| `users/followers.rb` | Get user's followers | Bearer |

### Timelines
| File | Description | Auth |
|------|-------------|------|
| `timelines/user_posts.rb` | User's posts timeline | Bearer |

### Lists
| File | Description | Auth |
|------|-------------|------|
| `lists/lookup.rb` | Look up a list | Bearer |

## Running Examples

```bash
# Make sure environment variables are set
ruby posts/search_recent.rb
```

## More Information

- [X API Documentation](https://developer.x.com/en/docs/twitter-api)
- [X Developer Portal](https://developer.x.com/en/portal/dashboard)
