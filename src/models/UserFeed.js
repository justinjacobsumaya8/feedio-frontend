import Article from "./Article";

class UserFeed {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : '',
            articleId: object.article_id ? parseInt(object.article_id) : '',
            userFolderSubscriptionId: object.user_folder_subscription_id ? parseInt(object.user_folder_subscription_id) : '',
            isRead: object.is_read ? Boolean(object.is_read) : false,
            article: object.article ? Article.format(object.article) : null,
            sourceId: object.source_id ? parseInt(object.source_id) : '',
            sourceName: object.source_name ?? '',
            categoryId: object.category_id ? parseInt(object.category_id) : '',
            categoryName: object.category_name ?? '',
            authorId: object.author_id ? parseInt(object.author_id) : '',
            authorName: object.author_name ?? '',
        };
    }
}

export default UserFeed;
