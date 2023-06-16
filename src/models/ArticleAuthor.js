import Article from "./Article";

class ArticleAuthor {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : "",
            authorId: object.author_id ? parseInt(object.author_id) : "",
            authorName: object.author_name ?? "",
            articleId: object.article_id ? parseInt(object.article_id) : "",
            article: object.article ? Article.format(object.article) : null,
        };
    }
}

export default ArticleAuthor;
