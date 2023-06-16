class ArticleBody {
    static format = (object) => {
        return {
            id: parseInt(object.id),
            articleId: parseInt(object.article_id),
            content: object.content,
        };
    }
}

export default ArticleBody;
