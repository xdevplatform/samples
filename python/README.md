# X API v2 - Python Examples

Working Python examples for the X API v2.

## Setup

```bash
pip install requests requests-oauthlib
```

## Environment Variables

```bash
export BEARER_TOKEN='your_bearer_token'
export CONSUMER_KEY='your_consumer_key'
export CONSUMER_SECRET='your_consumer_secret'
```

## Examples

### Posts
- posts/counts_full_archive.py
- posts/counts_recent.py
- posts/create_post.py
- posts/create_tweet.py
- posts/delete_post.py
- posts/delete_tweet.py
- posts/full_archive_tweet_counts.py
- posts/full-archive-search.py
- posts/get_tweets_with_bearer_token.py
- posts/get_tweets_with_user_context.py
- posts/like_a_tweet.py
- posts/like.py
- posts/liked_posts.py
- posts/liked_tweets.py
- posts/liking_users.py
- posts/lookup.py
- posts/quote_posts.py
- posts/quote_tweets.py
- posts/recent_search.py
- posts/recent_tweet_counts.py
- posts/repost.py
- posts/reposted_by.py
- posts/retweet_a_tweet.py
- posts/retweeted_by.py
- posts/search_full_archive.py
- posts/search_recent.py
- posts/undo_a_retweet.py
- posts/undo_repost.py
- posts/unlike_a_tweet.py
- posts/unlike.py

### Users
- users/block_a_user.py
- users/block.py
- users/blocked.py
- users/followers_lookup.py
- users/followers.py
- users/following_lookup.py
- users/following.py
- users/get_users_me_user_context.py
- users/get_users_with_bearer_token.py
- users/get_users_with_user_context.py
- users/lookup_blocks.py
- users/lookup_mutes.py
- users/lookup.py
- users/me.py
- users/mute_a_user.py
- users/mute.py
- users/muted.py
- users/unblock_a_user.py
- users/unblock.py
- users/unmute_a_user.py
- users/unmute.py

### Timelines
- timelines/home_timeline.py
- timelines/reverse-chron-home-timeline.py
- timelines/user_mentions.py
- timelines/user_posts.py
- timelines/user_tweets.py

### Streams
- streams/filtered_stream.py
- streams/sampled_stream.py
- streams/sampled-stream.py

### Lists
- lists/add_member.py
- lists/create_a_list.py
- lists/create.py
- lists/delete_a_list.py
- lists/delete.py
- lists/follow_list.py
- lists/list-followers-lookup.py
- lists/list-lookup-by-id.py
- lists/list-member-lookup.py
- lists/List-Tweets.py
- lists/lookup.py
- lists/pin_list.py
- lists/Pinned-List.py
- lists/remove_member.py
- lists/unfollow_list.py
- lists/unpin_list.py
- lists/update_a_list.py
- lists/user-list-followed.py
- lists/user-list-memberships.py
- lists/user-owned-list-lookup.py

### Bookmarks
- bookmarks/bookmarks_lookup.py
- bookmarks/create_bookmark.py
- bookmarks/create.py
- bookmarks/delete_bookmark.py
- bookmarks/delete.py
- bookmarks/lookup.py

### Spaces
- spaces/lookup.py
- spaces/search_spaces.py
- spaces/search.py
- spaces/spaces_lookup.py

### Direct Messages
- direct_messages/get_events_by_conversation.py
- direct_messages/get_one_to_one_conversation_events.py
- direct_messages/get_user_conversation_events.py
- direct_messages/lookup.py
- direct_messages/post_dm_to_conversation.py
- direct_messages/post_group_conversation_dm.py
- direct_messages/post_one_to_one_dm.py
- direct_messages/send.py

### Media
- media/media_upload_v2.py
- media/upload.py

### Compliance
- compliance/create_compliance_job.py
- compliance/create_job.py
- compliance/download_compliance_results.py
- compliance/get_compliance_job_information_by_id.py
- compliance/get_jobs.py
- compliance/get_list_of_compliance_jobs.py
- compliance/upload_ids.py

### Usage
- usage/get_usage_tweets.py
- usage/get_usage.py

