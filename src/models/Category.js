import Article from "./Article";

class Category {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : "",
            name: object.name ?? "",
            dateSourceId: object.data_source_id ? parseInt(object.data_source_id) : "",
            articles: object.articles ? object.articles.map((article) => Article.format(article)) : []
        };
    }
}

export default Category;
