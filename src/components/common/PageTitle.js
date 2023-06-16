import APP from "src/config/app";

export function PageTitle(data) {
    data.title = `${APP.NAME} | ${data.title}` || APP.NAME;
    data.metaDescription = data.metaDescription || 'News aggregator application';

    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}