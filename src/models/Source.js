class Source {
    static format = (object) => {
        return {
            id: object.id ? parseInt(object.id) : "",
            name: object.name ?? "",
            dateSourceId: object.data_source_id ? parseInt(object.data_source_id) : "",
        };
    }
}

export default Source;
