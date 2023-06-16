import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "src/redux/actions/showCategory.action";
import { setShowCategoryModal } from "src/redux/slices/showCategory.slice";
import BlockLoader from "../common/BlockLoader";
import CategoryFollowModal from "./CategoryFollowDropdown";

export default function ShowCategoryModal() {
    const dispatch = useDispatch();

    const { activeArticle } = useSelector((state) => state.exploreArticles);
    const { showCategoryModal, isLoading, category } = useSelector((state) => state.showCategory);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getCategory(activeArticle.categoryId));
            } catch (error) {
                //
            }
        })();
    }, [dispatch, activeArticle]);

    const onClickClose = (event) => {
        dispatch(setShowCategoryModal(false));
    };

    return (
        <>
            {showCategoryModal && (
                <div>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="h-screen min-h-full">
                            <div className="flex justify-end">
                                <div className="bg-white h-10 p-2 rounded-l-full hidden lg:block">
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-300"
                                        onClick={onClickClose}
                                    >
                                        <span className="hidden">Close</span>
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
                                <BlockLoader blocking={isLoading} className="float-right transform overflow-hidden bg-white text-left shadow-xl transition-all min-w-[75%] w-[907px] overflow-y-auto">
                                    <div className="bg-white h-screen">
                                        <div className="flex justify-center mx-3">
                                            {category.id && (
                                                <div className="md:w-10/12 lg:w-9/12 lg:px-40 lg:py-20 px-10 py-10">
                                                    <div className="flex items-start lg:items-center justify-between mb-12 lg:mb-16">
                                                        <div className="lg:flex lg:items-center lg:justify-between lg:w-full">
                                                            <div>
                                                                <div className="text-xs uppercase mb-3">Articles</div>
                                                                <h3 className="text-3xl mb-3 font-bold text-gray-900">
                                                                    {category.name}
                                                                </h3>
                                                            </div>
                                                            <CategoryFollowModal />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="text-gray-400 hover:text-gray-300 block lg:hidden"
                                                            onClick={onClickClose}
                                                        >
                                                            <span className="hidden">Close</span>
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
                                                    <div className="space-y-3">
                                                        <ul className="flex flex-col gap-5">
                                                            {category.articles.map((article) => (
                                                                <li key={article.id} className="group relative flex flex-col md:flex-row lg:flex-row overflow-hidden h-auto lg:border-none">
                                                                    <img
                                                                        className="block w-full md:w-48 lg:w-22 flex-none object-cover object-[center_top] bg-cover h-full lg:h-28 rounded"
                                                                        src={
                                                                            article.thumbnailUrl
                                                                                ? article.thumbnailUrl
                                                                                : "/images/default-img.jpg"
                                                                        }
                                                                        alt="Article Thumbnail"
                                                                    />
                                                                    <div className="mt-3 lg:mt-0">
                                                                        <div className="space-y-1 md:pl-4 ">
                                                                            <p className="font-semibold text-sm w-[90%] ">
                                                                                {article.title}
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                {article.sourceName} / {article.publishedAtFormatted}
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                {article.articleBodies[0].content.length > 150
                                                                                    ? article.articleBodies[0].content.slice(0, 150) + "..."
                                                                                    : article.articleBodies[0].content}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            {!category.id && (
                                                <div className="md:w-10/12 lg:w-9/12 lg:px-30 lg:py-20 px-10 py-10">
                                                    <div className="flex justify-between">
                                                        <span>No data found.</span>
                                                        <button
                                                            type="button"
                                                            className="text-gray-400 hover:text-gray-300 block lg:hidden"
                                                            onClick={onClickClose}
                                                        >
                                                            <span className="hidden">Close</span>
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
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </BlockLoader>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}