import ArticleAuthor from "./ArticleAuthor";
import ArticleBody from "./ArticleBody";

class Article {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : "",
            title: object.title ?? "",
            sourceId: object.source_id ? parseInt(object.source_id) : "",
            sourceName: object.source_name ?? "",
            categoryId: object.category_id ? parseInt(object.category_id) : "",
            categoryName: object.category_name ?? "",
            webUrl: object.web_url ?? "",
            thumbnailUrl: object.thumbnail_url ?? "",
            publishedAt: object.published_at ?? "",
            publishedAtFormatted: object.published_at_formatted ?? "",
            articleBodies: object.article_bodies ? object.article_bodies.map((articleBody) => ArticleBody.format(articleBody)) : [],
            articleAuthors: object.article_authors ? object.article_authors.map((articleAuthor) => ArticleAuthor.format(articleAuthor)) : [],
        };
    }
}

export default Article;
