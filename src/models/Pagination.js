class Pagination {
    static format = (object = {}) => {
        const data = object.data ? object.data : []; // Array of objects

        const links = {
            first: object.links ? object.links.first : null,
            last: object.links ? object.links.last : null,
            prev: object.links ? object.links.prev : null,
            next: object.links ? object.links.next : null
        };

        const meta = {
            currentPage: object.meta ? parseInt(object.meta.current_page) : 1,
            from: object.meta ? parseInt(object.meta.from) : 1,
            lastPage: object.meta ? parseInt(object.meta.last_page) : 1,
            perPage: object.meta ? parseInt(object.meta.per_page) : 25,
            to: object.meta ? parseInt(object.meta.to) : 1,
            total: object.meta ? parseInt(object.meta.total) : 0
        };

        return {
            data,
            links,
            meta
        };
    };
}

export default Pagination;
