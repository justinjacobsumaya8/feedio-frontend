import UserFolderSubscription from "./UserFolderSubscription";

class UserFolder {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : '',
            title: object.title ?? "",
            userId: object.user_id ? parseInt(object.user_id) : '',
            userFolderSubscriptions: object.user_folder_subscriptions
                ? object.user_folder_subscriptions.map((userFolderSubscription) => UserFolderSubscription.format(userFolderSubscription))
                : [],
            totalArticleCount: 0
        };
    }
}

export default UserFolder;
