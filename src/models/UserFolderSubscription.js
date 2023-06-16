import UserFeed from "./UserFeed";

class UserFolderSubscription {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : '',
            userFolderId: object.user_folder_id ? parseInt(object.user_folder_id) : '',
            sourceId: object.source_id ? parseInt(object.source_id) : '',
            sourceName: object.source_name ?? '',
            categoryId: object.category_id ? parseInt(object.category_id) : '',
            categoryName: object.category_name ?? '',
            authorId: object.author_id ? parseInt(object.author_id) : '',
            authorName: object.author_name ?? '',
            userFeedsCount: object.user_feeds_count ? parseInt(object.user_feeds_count) : 0,
            userFeeds: object.user_feeds ? object.user_feeds.map((userFeed) => UserFeed.format(userFeed)) : [],
        };
    }
}

export default UserFolderSubscription;
