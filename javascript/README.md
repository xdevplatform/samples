# JavaScript / TypeScript (Node.js) Samples for X API v2 (`@xdevplatform/xdk`)

Official JavaScript (Node.js 18+) sample code for the X API v2 powered by [**XDK for TypeScript / JavaScript** (`@xdevplatform/xdk`)](https://github.com/xdevplatform/xdk-typescript).

## Setup

### 1. Prerequisites

- **Node.js 18+** (`node --version`)
- An [X Developer Account](https://console.x.com) with API credentials

### 2. Install `@xdevplatform/xdk`

```bash
cd javascript
npm install
```

### 3. Set Environment Variables

**For App-only read operations (search, lookup, streams, webhooks, activity):**

```bash
export BEARER_TOKEN="your_bearer_token"
```

**For User-context actions (create post, like, repost, bookmark, mute, follow, DMs, media upload):**

```bash
export CLIENT_ID="your_oauth2_client_id"
export CLIENT_SECRET="your_oauth2_client_secret"   # optional for public clients
export REDIRECT_URI="https://example.com"          # must match your App settings
```

*(You can also set `ACCESS_TOKEN` directly if you already have a valid OAuth 2.0 user token.)*

## Examples by Category (84 Samples)

### Activity (5)
- `activity/create_subscription.js` - Subscribe to real-time X Activity events
- `activity/delete_subscription.js` - Delete an Activity subscription
- `activity/list_subscriptions.js` - List active Activity subscriptions
- `activity/stream_events.js` - Stream real-time Activity events
- `activity/update_subscription.js` - Update an Activity subscription tag / webhook

### Compliance (5)
- `compliance/create_jobs.js` - Create a batch compliance job
- `compliance/download_results.js` - Download compliance results
- `compliance/get_jobs.js` - List compliance jobs
- `compliance/get_jobs_by_id.js` - Get compliance job status by ID
- `compliance/upload_ids.js` - Upload Post/User IDs to a compliance job

### Direct Messages (6)
- `direct_messages/get_events_by_conversation.js` - Fetch DM events in a conversation
- `direct_messages/get_one_to_one_conversation_events.js` - Fetch 1-to-1 DM events with a participant
- `direct_messages/get_user_conversation_events.js` - Fetch recent DM events across conversations
- `direct_messages/post_dm_to_conversation.js` - Send a message to an existing conversation
- `direct_messages/post_group_conversation_dm.js` - Create a new group DM conversation
- `direct_messages/post_one_to_one_dm.js` - Send a 1-to-1 Direct Message

### Lists (9)
- `lists/add_member.js` - Add a member to a List
- `lists/create_list.js` - Create a new List
- `lists/delete_list.js` - Delete a List
- `lists/get_list_by_id.js` - Look up a List by ID
- `lists/get_list_followers.js` - Get List followers
- `lists/get_list_members.js` - Get List members
- `lists/get_list_posts.js` - Get Posts from a List
- `lists/remove_member.js` - Remove a member from a List
- `lists/update_list.js` - Update a List

### Media (2)
- `media/upload.js` - Single-payload image upload (`POST /2/media/upload`)
- `media/media_upload_v2.js` - Chunked video upload (`initialize` -> `append` -> `finalize` -> `STATUS` -> `posts.create`)

### Posts (13)
- `posts/create_post.js` - Create a Post
- `posts/delete_post.js` - Delete a Post
- `posts/get_liking_users.js` - Get users who liked a Post
- `posts/get_post_by_id.js` - Look up a single Post by ID
- `posts/get_post_counts_all.js` - Full-archive Post counts
- `posts/get_post_counts_recent.js` - Recent Post counts (last 7 days)
- `posts/get_posts_by_ids.js` - Look up multiple Posts by IDs (Bearer Token)
- `posts/get_posts_by_ids_user_context.js` - Look up multiple Posts by IDs (OAuth 2.0 User Context)
- `posts/get_quoted_posts.js` - Get Quote Posts for a Post
- `posts/get_reposted_by.js` - Get users who reposted a Post
- `posts/hide_reply.js` - Hide or unhide a reply
- `posts/search_all.js` - Full-archive search
- `posts/search_recent.js` - Recent search (last 7 days)

### Spaces (2)
- `spaces/get_spaces_by_ids.js` - Look up Spaces by IDs
- `spaces/search_spaces.js` - Search live/scheduled Spaces

### Streams (2)
- `streams/stream_posts_filtered.js` - Filtered stream with rule management
- `streams/stream_posts_sample.js` - 1% sampled volume stream

### Usage (1)
- `usage/get_usage.js` - Daily API Post usage metrics

### Users (34)
- `users/get_users_by_usernames.js`, `users/get_users_by_usernames_user_context.js`, `users/get_users_me.js`
- `users/block/get_blocking.js`
- `users/bookmark/{create_bookmark,delete_bookmark,get_bookmarks}.js`
- `users/follow/{follow_user,get_followers,get_followers_paginated,get_following,get_following_paginated,unfollow_user}.js`
- `users/like/{get_liked_posts,like_post,unlike_post}.js`
- `users/lists/{follow_list,get_followed_lists,get_list_memberships,get_owned_lists,get_pinned_lists,pin_list,unfollow_list,unpin_list}.js`
- `users/mute/{get_muting,mute_user,unmute_user}.js`
- `users/repost/{get_reposts_of_me,repost_post,unrepost_post}.js`
- `users/timeline/{get_home_timeline,get_mentions,get_posts,get_posts_paginated}.js`

### Webhooks (5)
- `webhooks/register_webhook.js` - Register a webhook URL
- `webhooks/list_webhooks.js` - List registered webhooks
- `webhooks/validate_webhook.js` - Trigger a CRC validation check
- `webhooks/delete_webhook.js` - Delete a webhook
- `webhooks/webhook_server.js` - Minimal Node.js HTTP server handling CRC (`HMAC-SHA256`) and POST deliveries

## Running Any Sample

```bash
cd javascript
npm install
node posts/search_recent.js
```
