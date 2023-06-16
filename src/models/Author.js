import ArticleAuthor from "./ArticleAuthor";

class Author {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : "",
            name: object.name ?? "",
            dateSourceId: object.data_source_id ? parseInt(object.data_source_id) : "",
            articleAuthors: object.article_authors ? object.article_authors.map((articleAuthor) => ArticleAuthor.format(articleAuthor)) : []
        };
    }
}

export default Author;
