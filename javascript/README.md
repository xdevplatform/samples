# X API v2 - JavaScript (Node.js) Examples

Working JavaScript code samples for the X (formerly Twitter) API v2.

## Setup

### 1. Install Node.js 14+

```bash
node --version
```

### 2. Install dependencies

```
npm install @xdevplatform/xdk
```

### 3. Set environment variables

**For read-only operations (search, lookup):**
```bash
export BEARER_TOKEN='your_bearer_token'
```

**For user actions (post, like, repost, bookmark, mute, etc.):**
```bash
export CLIENT_ID='your_client_id'
export CLIENT_SECRET='your_client_secret'
```

**Note:** Most user action examples (create post, like, repost, bookmark, mute, block, etc.) require OAuth 2.0 authentication with `CLIENT_ID` and `CLIENT_SECRET`. Read-only examples (search, lookup) only require `BEARER_TOKEN`.

## Examples by Category

### Posts
- `posts/create_post.js` - Create a new post (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `posts/delete_post.js` - Delete a post (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `posts/get_liking_users.js` - Get users who liked a post (requires `CLIENT_ID`, `CLIENT_SECRET` for user context)
- `posts/get_post_counts_all.js` - Get post counts (full archive)
- `posts/get_post_counts_recent.js` - Get post counts (recent)
- `posts/get_posts_by_ids.js` - Look up posts by ID (bearer token)
- `posts/get_posts_by_ids_user_context.js` - Look up posts by ID (user context) (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `posts/get_quoted_posts.js` - Get posts that quote a post
- `posts/get_reposted_by.js` - Get users who reposted a post
- `posts/search_all.js` - Full archive search
- `posts/search_recent.js` - Recent search (last 7 days)

### Users
- `users/get_users_by_usernames.js` - Look up users by username (bearer token)
- `users/get_users_by_usernames_user_context.js` - Look up users by username (user context) (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/get_users_me.js` - Get authenticated user (me) (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Block
- `users/block/get_blocking.js` - Get users blocked by a user (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Bookmark
- `users/bookmark/create_bookmark.js` - Create a bookmark (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/bookmark/delete_bookmark.js` - Delete a bookmark (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/bookmark/get_bookmarks.js` - Get user's bookmarks (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Follow
- `users/follow/get_followers.js` - Get user's followers
- `users/follow/get_followers_paginated.js` - Get user's followers (paginated)
- `users/follow/get_following_paginated.js` - Get users a user is following (paginated)

#### User Actions - Like
- `users/like/get_liked_posts.js` - Get posts liked by a user (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/like/like_post.js` - Like a post (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/like/unlike_post.js` - Unlike a post (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Lists
- `users/lists/follow_list.js` - Follow a list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/lists/get_followed_lists.js` - Get lists followed by a user
- `users/lists/get_list_memberships.js` - Get list memberships
- `users/lists/get_owned_lists.js` - Get lists owned by a user
- `users/lists/pin_list.js` - Pin a list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/lists/unfollow_list.js` - Unfollow a list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/lists/unpin_list.js` - Unpin a list (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Mute
- `users/mute/get_muting.js` - Get users muted by a user (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/mute/mute_user.js` - Mute a user (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/mute/unmute_user.js` - Unmute a user (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Repost
- `users/repost/repost_post.js` - Repost a post (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/repost/unrepost_post.js` - Undo a repost (requires `CLIENT_ID`, `CLIENT_SECRET`)

#### User Actions - Timeline
- `users/timeline/get_home_timeline.js` - Get home timeline (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `users/timeline/get_mentions.js` - Get user mentions timeline
- `users/timeline/get_posts.js` - Get user's posts timeline
- `users/timeline/get_posts_paginated.js` - Get user's posts timeline (paginated)

### Timelines
- See `users/timeline/` directory for timeline examples

### Streams
- `streams/stream_posts_filtered.js` - Filtered stream with rules
- `streams/stream_posts_sample.js` - Sampled stream

### Lists
- `lists/add_member.js` - Add member to a list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `lists/create_list.js` - Create a new list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `lists/delete_list.js` - Delete a list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `lists/get_list_by_id.js` - Get list by ID
- `lists/get_list_followers.js` - Get list followers
- `lists/get_list_members.js` - Get list members
- `lists/get_list_posts.js` - Get posts from a list
- `lists/remove_member.js` - Remove member from a list (requires `CLIENT_ID`, `CLIENT_SECRET`)
- `lists/update_list.js` - Update a list (requires `CLIENT_ID`, `CLIENT_SECRET`)

### Spaces
- `spaces/get_spaces_by_ids.js` - Look up Spaces by ID
- `spaces/search_spaces.js` - Search for Spaces

### Compliance
- `compliance/create_jobs.js` - Create compliance job
- `compliance/download_results.js` - Download compliance results
- `compliance/get_jobs_by_id.js` - Get compliance job by ID
- `compliance/get_jobs.js` - Get compliance jobs
- `compliance/upload_ids.js` - Upload IDs for compliance

### Usage
- `usage/get_usage.js` - Get API usage information

## Running Examples

```bash
# Make sure environment variables are set
node posts/search_recent.js
```

## More Information

- [X API Documentation](https://developer.x.com/en/docs/twitter-api)
- [X Developer Portal](https://developer.x.com/en/portal/dashboard)
