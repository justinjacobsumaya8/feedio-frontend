import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "src/redux/actions/exploreArticles.action";
import {
    resetFilter,
    setActiveArticle,
    setCurrentPage,
    setKeyword,
    setShowAddFilter,
    setShowArticleModal,
} from "src/redux/slices/exploreArticles.slice";
import BlockLoader from "../common/BlockLoader";
import Pagination from "../common/Paginate";
import FilterIcon from "../icons/FilterIcon";
import SearchIcon from "../icons/SearchIcon";
import AddFilter from "./AddFilter";
import ShowArticleModal from "./ShowArticleModal";

export default function ExploreTab() {
    const dispatch = useDispatch();

    const { isLoading, pagination, keyword, showAddFilter, filter } = useSelector((state) => state.exploreArticles);
    const { categories } = useSelector((state) => state.commonCategories);
    const { sources } = useSelector((state) => state.commonSources);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getArticles());
            } catch (error) {
                //
            }
        })();
    }, [dispatch]);

    const onClickFeed = (event, article) => {
        dispatch(setShowArticleModal(true));
        dispatch(setActiveArticle(article));
    };

    const onChangePage = (event) => {
        dispatch(setCurrentPage(event.selected + 1));
        return dispatch(getArticles());
    };

    const onSubmitSearch = (event) => {
        event.preventDefault();

        dispatch(setCurrentPage(1));
        dispatch(getArticles());
    };

    const onChangeKeyword = (event) => {
        dispatch(setKeyword(event.target.value));
        if (event.target.value === "") {
            dispatch(getArticles());
        }
    };

    const onClickAddFilter = (event) => {
        dispatch(setShowAddFilter(true));
    };

    const onClickRemoveFilter = (event, field) => {
        dispatch(resetFilter(field));
        dispatch(getArticles());
    };

    return (
        <div className="mt-5">
            <BlockLoader blocking={isLoading}>
                <div className="flex">
                    <button
                        type="button"
                        className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-l hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                        onClick={onClickAddFilter}
                    >
                        <FilterIcon className="h-4 w-4 mr-2" /> Filter
                    </button>

                    <form className="relative w-full" onSubmit={onSubmitSearch}>
                        <input
                            type="search"
                            className="block p-2.5 w-full z-20 text-gray-900 rounded-r-lg border-l-gray-50 border-l border border-gray-300 focus:outline-0 focus:border-blue-300"
                            placeholder="Search..."
                            value={keyword}
                            onChange={onChangeKeyword}
                        />
                        <button
                            type="submit"
                            className="group absolute top-0 right-0 p-2.5 text-sm h-full font-medium text-white bg-blue-500 rounded-r border border-blue-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            <SearchIcon className=" stroke-white h-6 w-6 group-hover:stroke-white" />
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
                {showAddFilter && <AddFilter />}
                <div className="mt-2 flex">
                    {filter.range.startDate !== "" && filter.range.endDate !== "" && (
                        <div className="flex">
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Date: {filter.range.startDate} - {filter.range.endDate}
                            </span>
                            <button
                                type="button"
                                onClick={(event) => onClickRemoveFilter(event, "range")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    )}
                    {filter.categoryId !== "" && (
                        <div className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <span>
                                    Category:{" "}
                                    <span className="font-bold">
                                        {
                                            categories.find(
                                                (category) => category.id === filter.categoryId
                                            ).name
                                        }
                                    </span>
                                </span>
                                <button
                                    type="button"
                                    className="rounded-full border bg-white"
                                    onClick={(event) =>
                                        onClickRemoveFilter(event, "categoryId")
                                    }
                                >
                                    <img
                                        src="/images/close.svg"
                                        alt="Close"
                                        className="w-4 h-4"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                    {filter.sourceId !== "" && (
                        <div className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <span>
                                    Source:{" "}
                                    <span className="font-bold">
                                        {
                                            sources.find((source) => source.id === filter.sourceId)
                                                .name
                                        }
                                    </span>
                                </span>
                                <button
                                    type="button"
                                    className="rounded-full border bg-white"
                                    onClick={(event) => onClickRemoveFilter(event, "sourceId")}
                                >
                                    <img
                                        src="/images/close.svg"
                                        alt="Close"
                                        className="w-4 h-4"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-3">
                    {pagination.data.map((article, index) => (
                        <div
                            key={index}
                            className="group relative p-5 items-start flex flex-col md:flex-row lg:flex-row rounded overflow-hidden h-auto cursor-pointer hover:rounded hover:bg-gray-100 lg:border-none"
                            onClick={(event) => onClickFeed(event, article)}
                        >
                            <img
                                className="block w-full md:w-48 lg:w-48 flex-none object-cover object-[center_top] bg-cover h-full lg:h-28 rounded"
                                src={
                                    article.thumbnailUrl
                                        ? article.thumbnailUrl
                                        : "/images/default-img.jpeg"
                                }
                                alt="Article Thumbnail"
                            />

                            <div className="mt-3 lg:mt-0">
                                <div className="space-y-1 md:pl-4 ">
                                    <p className="text-xs text-gray-400">
                                        <span>{article.categoryName}</span> /{" "}
                                        {article.publishedAtFormatted}
                                    </p>
                                    <p className="font-semibold text-sm w-[90%] ">
                                        {article.title}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {article.articleBodies[0].content.length > 200
                                            ? article.articleBodies[0].content.slice(0, 200) + "..."
                                            : article.articleBodies[0].content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {pagination.data.length === 0 && (
                        <span className="text-sm">No results found.</span>
                    )}
                </div>
            </BlockLoader>
            {!isLoading && (
                <div className="mt-3 flex justify-center">
                    <Pagination
                        data={pagination}
                        isLoading={isLoading}
                        handlePageClick={onChangePage}
                    />
                </div>
            )}

            <ShowArticleModal subscriptionType="all" />
        </div>
    );
}