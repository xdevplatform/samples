public static class SamplesRunner
{
    private static readonly Dictionary<string, (string Title, Func<Task> Action)> Registry =
        new(StringComparer.OrdinalIgnoreCase)
    {
        ["activity/create_subscription"] = ("Create Activity Subscription", Samples.Activity.CreateSubscription.RunAsync),
        ["activity/delete_subscription"] = ("Delete Activity Subscription", Samples.Activity.DeleteSubscription.RunAsync),
        ["activity/list_subscriptions"] = ("List Activity Subscriptions", Samples.Activity.ListSubscriptions.RunAsync),
        ["activity/stream_events"] = ("Activity Stream", Samples.Activity.StreamEvents.RunAsync),
        ["activity/update_subscription"] = ("Update Activity Subscription", Samples.Activity.UpdateSubscription.RunAsync),
        ["compliance/create_jobs"] = ("Create Compliance Job", Samples.Compliance.CreateJobs.RunAsync),
        ["compliance/download_results"] = ("Download Compliance Results", Samples.Compliance.DownloadResults.RunAsync),
        ["compliance/get_jobs"] = ("Get Compliance Jobs", Samples.Compliance.GetJobs.RunAsync),
        ["compliance/get_jobs_by_id"] = ("Get Compliance Job by ID", Samples.Compliance.GetJobsById.RunAsync),
        ["compliance/upload_ids"] = ("Upload IDs for Compliance Job", Samples.Compliance.UploadIds.RunAsync),
        ["direct_messages/get_events_by_conversation"] = ("Get Events by Conversation ID", Samples.DirectMessages.GetEventsByConversation.RunAsync),
        ["direct_messages/get_one_to_one_conversation_events"] = ("Get One-to-One Conversation Events", Samples.DirectMessages.GetOneToOneConversationEvents.RunAsync),
        ["direct_messages/get_user_conversation_events"] = ("Get User Conversation Events", Samples.DirectMessages.GetUserConversationEvents.RunAsync),
        ["direct_messages/post_dm_to_conversation"] = ("Post DM to Conversation", Samples.DirectMessages.PostDmToConversation.RunAsync),
        ["direct_messages/post_group_conversation_dm"] = ("Post Group Conversation Direct Message", Samples.DirectMessages.PostGroupConversationDm.RunAsync),
        ["direct_messages/post_one_to_one_dm"] = ("Post One-to-One Direct Message", Samples.DirectMessages.PostOneToOneDm.RunAsync),
        ["lists/add_member"] = ("Add List Member", Samples.Lists.AddMember.RunAsync),
        ["lists/create_list"] = ("Create List", Samples.Lists.CreateList.RunAsync),
        ["lists/delete_list"] = ("Delete List", Samples.Lists.DeleteList.RunAsync),
        ["lists/get_list_by_id"] = ("List Lookup by ID", Samples.Lists.GetListById.RunAsync),
        ["lists/get_list_followers"] = ("List Followers Lookup", Samples.Lists.GetListFollowers.RunAsync),
        ["lists/get_list_members"] = ("List Members Lookup", Samples.Lists.GetListMembers.RunAsync),
        ["lists/get_list_posts"] = ("List Posts", Samples.Lists.GetListPosts.RunAsync),
        ["lists/remove_member"] = ("Remove List Member", Samples.Lists.RemoveMember.RunAsync),
        ["lists/update_list"] = ("Update List", Samples.Lists.UpdateList.RunAsync),
        ["media/media_upload_v2"] = ("Media Upload v2 (Chunked Video Upload)", Samples.Media.MediaUploadV2.RunAsync),
        ["media/upload"] = ("Media Upload (Single Payload)", Samples.Media.Upload.RunAsync),
        ["posts/create_post"] = ("Create Post", Samples.Posts.CreatePost.RunAsync),
        ["posts/delete_post"] = ("Delete Post", Samples.Posts.DeletePost.RunAsync),
        ["posts/get_liking_users"] = ("Liking Users", Samples.Posts.GetLikingUsers.RunAsync),
        ["posts/get_post_by_id"] = ("Single Post Lookup", Samples.Posts.GetPostById.RunAsync),
        ["posts/get_post_counts_all"] = ("Full-Archive Post Counts", Samples.Posts.GetPostCountsAll.RunAsync),
        ["posts/get_post_counts_recent"] = ("Recent Post Counts", Samples.Posts.GetPostCountsRecent.RunAsync),
        ["posts/get_posts_by_ids"] = ("Post Lookup by IDs", Samples.Posts.GetPostsByIds.RunAsync),
        ["posts/get_quoted_posts"] = ("Quote Posts Lookup", Samples.Posts.GetQuotedPosts.RunAsync),
        ["posts/get_reposted_by"] = ("Reposted By (Users who reposted)", Samples.Posts.GetRepostedBy.RunAsync),
        ["posts/hide_reply"] = ("Hide Reply", Samples.Posts.HideReply.RunAsync),
        ["posts/search_all"] = ("Full-Archive Search", Samples.Posts.SearchAll.RunAsync),
        ["posts/search_recent"] = ("Recent Search", Samples.Posts.SearchRecent.RunAsync),
        ["spaces/get_spaces_by_ids"] = ("Spaces Lookup by IDs", Samples.Spaces.GetSpacesByIds.RunAsync),
        ["spaces/search_spaces"] = ("Search Spaces", Samples.Spaces.SearchSpaces.RunAsync),
        ["streams/stream_posts_filtered"] = ("Filtered Stream", Samples.Streams.StreamPostsFiltered.RunAsync),
        ["streams/stream_posts_sample"] = ("Sampled Stream (1% Volume)", Samples.Streams.StreamPostsSample.RunAsync),
        ["usage/get_usage"] = ("Usage Posts", Samples.Usage.GetUsage.RunAsync),
        ["users/block/get_blocking"] = ("Blocked Users Lookup", Samples.Users.Block.GetBlocking.RunAsync),
        ["users/bookmark/create_bookmark"] = ("Create Bookmark", Samples.Users.Bookmark.CreateBookmark.RunAsync),
        ["users/bookmark/delete_bookmark"] = ("Delete Bookmark", Samples.Users.Bookmark.DeleteBookmark.RunAsync),
        ["users/bookmark/get_bookmarks"] = ("Bookmarks Lookup", Samples.Users.Bookmark.GetBookmarks.RunAsync),
        ["users/follow/follow_user"] = ("Follow User", Samples.Users.Follow.FollowUser.RunAsync),
        ["users/follow/get_followers"] = ("User Followers Lookup", Samples.Users.Follow.GetFollowers.RunAsync),
        ["users/follow/get_following"] = ("User Following Lookup", Samples.Users.Follow.GetFollowing.RunAsync),
        ["users/follow/unfollow_user"] = ("Unfollow User", Samples.Users.Follow.UnfollowUser.RunAsync),
        ["users/get_users_by_usernames"] = ("User Lookup by Usernames", Samples.Users.GetUsersByUsernames.RunAsync),
        ["users/get_users_by_usernames_user_context"] = ("User Lookup (User Context)", Samples.Users.GetUsersByUsernamesUserContext.RunAsync),
        ["users/get_users_me"] = ("Authenticated User Lookup (Me)", Samples.Users.GetUsersMe.RunAsync),
        ["users/like/get_liked_posts"] = ("Liked Posts", Samples.Users.Like.GetLikedPosts.RunAsync),
        ["users/like/like_post"] = ("Like a Post", Samples.Users.Like.LikePost.RunAsync),
        ["users/like/unlike_post"] = ("Unlike a Post", Samples.Users.Like.UnlikePost.RunAsync),
        ["users/lists/follow_list"] = ("Follow List", Samples.Users.Lists.FollowList.RunAsync),
        ["users/lists/get_followed_lists"] = ("User Followed Lists Lookup", Samples.Users.Lists.GetFollowedLists.RunAsync),
        ["users/lists/get_list_memberships"] = ("User List Memberships Lookup", Samples.Users.Lists.GetListMemberships.RunAsync),
        ["users/lists/get_owned_lists"] = ("User Owned Lists Lookup", Samples.Users.Lists.GetOwnedLists.RunAsync),
        ["users/lists/get_pinned_lists"] = ("Pinned Lists Lookup", Samples.Users.Lists.GetPinnedLists.RunAsync),
        ["users/lists/pin_list"] = ("Pin List", Samples.Users.Lists.PinList.RunAsync),
        ["users/lists/unfollow_list"] = ("Unfollow List", Samples.Users.Lists.UnfollowList.RunAsync),
        ["users/lists/unpin_list"] = ("Unpin List", Samples.Users.Lists.UnpinList.RunAsync),
        ["users/mute/get_muting"] = ("Muted Users Lookup", Samples.Users.Mute.GetMuting.RunAsync),
        ["users/mute/mute_user"] = ("Mute User", Samples.Users.Mute.MuteUser.RunAsync),
        ["users/mute/unmute_user"] = ("Unmute User", Samples.Users.Mute.UnmuteUser.RunAsync),
        ["users/repost/get_reposts_of_me"] = ("Reposts of Me", Samples.Users.Repost.GetRepostsOfMe.RunAsync),
        ["users/repost/repost_post"] = ("Repost a Post", Samples.Users.Repost.RepostPost.RunAsync),
        ["users/repost/unrepost_post"] = ("Undo Repost", Samples.Users.Repost.UnrepostPost.RunAsync),
        ["users/timeline/get_home_timeline"] = ("Reverse Chronological Home Timeline", Samples.Users.Timeline.GetHomeTimeline.RunAsync),
        ["users/timeline/get_mentions"] = ("User Mentions Timeline", Samples.Users.Timeline.GetMentions.RunAsync),
        ["users/timeline/get_posts"] = ("User Posts Timeline", Samples.Users.Timeline.GetPosts.RunAsync),
        ["webhooks/delete_webhook"] = ("Delete Webhook", Samples.Webhooks.DeleteWebhook.RunAsync),
        ["webhooks/list_webhooks"] = ("List Webhooks", Samples.Webhooks.ListWebhooks.RunAsync),
        ["webhooks/register_webhook"] = ("Register Webhook", Samples.Webhooks.RegisterWebhook.RunAsync),
        ["webhooks/validate_webhook"] = ("Validate Webhook (Trigger CRC)", Samples.Webhooks.ValidateWebhook.RunAsync),
        ["webhooks/webhook_server"] = ("Webhook Server (CRC + Event Delivery)", Samples.Webhooks.WebhookServer.RunAsync),
    };

    public static async Task<int> Main(string[] args)
    {
        if (args.Length == 0 || args[0] is "-h" or "--help" or "list")
        {
            Console.WriteLine("X API v2 C# Samples (XDevPlatform.Xdk)");
            Console.WriteLine("Usage: dotnet run -- <category/sample_name>\n");
            Console.WriteLine($"Available samples ({Registry.Count}):");
            foreach (var (key, entry) in Registry.OrderBy(kv => kv.Key))
            {
                Console.WriteLine($"  {key,-48} {entry.Title}");
            }
            return 0;
        }

        var requested = args[0].Trim().Replace("\\", "/").TrimEnd('/');
        if (requested.EndsWith(".cs", StringComparison.OrdinalIgnoreCase))
        {
            requested = requested[..^3];
        }

        if (!Registry.TryGetValue(requested, out var sample))
        {
            Console.Error.WriteLine($"Unknown sample '{args[0]}'. Run 'dotnet run -- --help' to list all {Registry.Count} samples.");
            return 1;
        }

        await sample.Action();
        return 0;
    }
}
