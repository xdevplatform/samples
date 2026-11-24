# TypeScript Samples for X API v2 (`@xdevplatform/xdk`)

Official TypeScript (Node.js 18+ ESM) sample code for the X API v2 powered by [**XDK for TypeScript** (`@xdevplatform/xdk`)](https://github.com/xdevplatform/xdk-typescript).

All 84 samples are strictly type-checked (`tsc --noEmit` with `"strict": true`).

## Setup

### 1. Prerequisites

- **Node.js 18+** (`node --version`)
- An [X Developer Account](https://console.x.com) with API credentials

### 2. Install Dependencies

```bash
cd typescript
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

## Running & Type-Checking Samples

```bash
cd typescript
npm install

# Run any sample directly via tsx
npx tsx posts/search_recent.ts

# Strictly type-check all 84 samples
npm run typecheck
```

## Examples by Category (84 Samples)

### Activity (5)
- `activity/create_subscription.ts` - Subscribe to real-time X Activity events
- `activity/delete_subscription.ts` - Delete an Activity subscription
- `activity/list_subscriptions.ts` - List active Activity subscriptions
- `activity/stream_events.ts` - Stream real-time Activity events
- `activity/update_subscription.ts` - Update an Activity subscription tag / webhook

### Compliance (5)
- `compliance/create_jobs.ts` - Create a batch compliance job
- `compliance/download_results.ts` - Download compliance results
- `compliance/get_jobs.ts` - List compliance jobs
- `compliance/get_jobs_by_id.ts` - Get compliance job status by ID
- `compliance/upload_ids.ts` - Upload Post/User IDs to a compliance job

### Direct Messages (6)
- `direct_messages/get_events_by_conversation.ts` - Fetch DM events in a conversation
- `direct_messages/get_one_to_one_conversation_events.ts` - Fetch 1-to-1 DM events with a participant
- `direct_messages/get_user_conversation_events.ts` - Fetch recent DM events across conversations
- `direct_messages/post_dm_to_conversation.ts` - Send a message to an existing conversation
- `direct_messages/post_group_conversation_dm.ts` - Create a new group DM conversation
- `direct_messages/post_one_to_one_dm.ts` - Send a 1-to-1 Direct Message

### Lists (9)
- `lists/add_member.ts` - Add a member to a List
- `lists/create_list.ts` - Create a new List
- `lists/delete_list.ts` - Delete a List
- `lists/get_list_by_id.ts` - Look up a List by ID
- `lists/get_list_followers.ts` - Get List followers
- `lists/get_list_members.ts` - Get List members
- `lists/get_list_posts.ts` - Get Posts from a List
- `lists/remove_member.ts` - Remove a member from a List
- `lists/update_list.ts` - Update a List

### Media (2)
- `media/upload.ts` - Single-payload image upload (`POST /2/media/upload`)
- `media/media_upload_v2.ts` - Chunked video upload (`initialize` -> `append` -> `finalize` -> `STATUS` -> `posts.create`)

### Posts (13)
- `posts/create_post.ts` - Create a Post
- `posts/delete_post.ts` - Delete a Post
- `posts/get_liking_users.ts` - Get users who liked a Post
- `posts/get_post_by_id.ts` - Look up a single Post by ID
- `posts/get_post_counts_all.ts` - Full-archive Post counts
- `posts/get_post_counts_recent.ts` - Recent Post counts (last 7 days)
- `posts/get_posts_by_ids.ts` - Look up multiple Posts by IDs (Bearer Token)
- `posts/get_posts_by_ids_user_context.ts` - Look up multiple Posts by IDs (OAuth 2.0 User Context)
- `posts/get_quoted_posts.ts` - Get Quote Posts for a Post
- `posts/get_reposted_by.ts` - Get users who reposted a Post
- `posts/hide_reply.ts` - Hide or unhide a reply
- `posts/search_all.ts` - Full-archive search
- `posts/search_recent.ts` - Recent search (last 7 days)

### Spaces (2)
- `spaces/get_spaces_by_ids.ts` - Look up Spaces by IDs
- `spaces/search_spaces.ts` - Search live/scheduled Spaces

### Streams (2)
- `streams/stream_posts_filtered.ts` - Filtered stream with rule management
- `streams/stream_posts_sample.ts` - 1% sampled volume stream

### Usage (1)
- `usage/get_usage.ts` - Daily API Post usage metrics

### Users (34)
- `users/get_users_by_usernames.ts`, `users/get_users_by_usernames_user_context.ts`, `users/get_users_me.ts`
- `users/block/get_blocking.ts`
- `users/bookmark/{create_bookmark,delete_bookmark,get_bookmarks}.ts`
- `users/follow/{follow_user,get_followers,get_followers_paginated,get_following,get_following_paginated,unfollow_user}.ts`
- `users/like/{get_liked_posts,like_post,unlike_post}.ts`
- `users/lists/{follow_list,get_followed_lists,get_list_memberships,get_owned_lists,get_pinned_lists,pin_list,unfollow_list,unpin_list}.ts`
- `users/mute/{get_muting,mute_user,unmute_user}.ts`
- `users/repost/{get_reposts_of_me,repost_post,unrepost_post}.ts`
- `users/timeline/{get_home_timeline,get_mentions,get_posts,get_posts_paginated}.ts`

### Webhooks (5)
- `webhooks/register_webhook.ts` - Register a webhook URL
- `webhooks/list_webhooks.ts` - List registered webhooks
- `webhooks/validate_webhook.ts` - Trigger a CRC validation check
- `webhooks/delete_webhook.ts` - Delete a webhook
- `webhooks/webhook_server.ts` - Minimal Node.js HTTP server handling CRC (`HMAC-SHA256`) and POST deliveries
