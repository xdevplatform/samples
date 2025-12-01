# X API v2 - Python Examples

Working Python code samples for the X (formerly Twitter) API v2.

## Setup

### 1. Install Python 3.7+

```bash
python3 --version
```

### 2. Create a virtual environment (recommended)

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set environment variables

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

### Posts (Tweets)
| File | Description | Auth |
|------|-------------|------|
| `posts/create_post.py` | Create a new post | OAuth 1.0a |
| `posts/delete_post.py` | Delete a post | OAuth 1.0a |
| `posts/lookup.py` | Look up posts by ID | Bearer |
| `posts/search_recent.py` | Search recent posts (7 days) | Bearer |
| `posts/search_full_archive.py` | Search all posts (Academic) | Bearer |
| `posts/counts_recent.py` | Get post counts (7 days) | Bearer |
| `posts/counts_full_archive.py` | Get post counts (all time) | Bearer |
| `posts/quote_posts.py` | Get quote posts | Bearer |
| `posts/repost.py` | Repost (retweet) | OAuth 1.0a |
| `posts/undo_repost.py` | Undo repost | OAuth 1.0a |
| `posts/reposted_by.py` | Users who reposted | Bearer |
| `posts/like.py` | Like a post | OAuth 1.0a |
| `posts/unlike.py` | Unlike a post | OAuth 1.0a |
| `posts/liking_users.py` | Users who liked a post | Bearer |
| `posts/liked_posts.py` | Posts liked by a user | Bearer |

### Users
| File | Description | Auth |
|------|-------------|------|
| `users/lookup.py` | Look up users by username | Bearer |
| `users/me.py` | Get authenticated user | OAuth 1.0a |
| `users/followers.py` | Get user's followers | Bearer |
| `users/following.py` | Get user's following | Bearer |
| `users/block.py` | Block a user | OAuth 1.0a |
| `users/unblock.py` | Unblock a user | OAuth 1.0a |
| `users/blocked.py` | Get blocked users | OAuth 1.0a |
| `users/mute.py` | Mute a user | OAuth 1.0a |
| `users/unmute.py` | Unmute a user | OAuth 1.0a |
| `users/muted.py` | Get muted users | OAuth 1.0a |

### Timelines
| File | Description | Auth |
|------|-------------|------|
| `timelines/user_posts.py` | User's posts timeline | Bearer |
| `timelines/user_mentions.py` | User's mentions | Bearer |
| `timelines/home_timeline.py` | Home timeline | OAuth 1.0a |

### Streams
| File | Description | Auth |
|------|-------------|------|
| `streams/filtered_stream.py` | Filtered stream with rules | Bearer |
| `streams/sampled_stream.py` | 1% sampled stream | Bearer |

### Bookmarks
| File | Description | Auth |
|------|-------------|------|
| `bookmarks/lookup.py` | Get bookmarks | OAuth 2.0 |
| `bookmarks/create.py` | Create bookmark | OAuth 2.0 |
| `bookmarks/delete.py` | Delete bookmark | OAuth 2.0 |

### Spaces
| File | Description | Auth |
|------|-------------|------|
| `spaces/lookup.py` | Look up Spaces | Bearer |
| `spaces/search.py` | Search Spaces | Bearer |

### Lists
| File | Description | Auth |
|------|-------------|------|
| `lists/lookup.py` | Look up a list | Bearer |
| `lists/create.py` | Create a list | OAuth 1.0a |
| `lists/delete.py` | Delete a list | OAuth 1.0a |

### Direct Messages
| File | Description | Auth |
|------|-------------|------|
| `direct_messages/lookup.py` | Get DM events | OAuth 1.0a |
| `direct_messages/send.py` | Send a DM | OAuth 1.0a |

### Media
| File | Description | Auth |
|------|-------------|------|
| `media/upload.py` | Upload media | OAuth 1.0a |

### Compliance
| File | Description | Auth |
|------|-------------|------|
| `compliance/create_job.py` | Create compliance job | Bearer |
| `compliance/get_jobs.py` | Get compliance jobs | Bearer |

### Usage
| File | Description | Auth |
|------|-------------|------|
| `usage/get_usage.py` | Get API usage stats | Bearer |

## Running Examples

```bash
# Make sure environment variables are set
python posts/search_recent.py
```

## More Information

- [X API Documentation](https://developer.x.com/en/docs/twitter-api)
- [X Developer Portal](https://developer.x.com/en/portal/dashboard)
