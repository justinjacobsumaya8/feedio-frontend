import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlockLoader from "../common/BlockLoader";
import { getAuthor } from "src/redux/actions/showAuthor.action";
import { setShowAuthorModal } from "src/redux/slices/showAuthor.slice";
import AuthorFollowModal from "./AuthorFollowDropdown";

export default function ShowAuthorModal() {
    const dispatch = useDispatch();

    const { showAuthorModal, isLoading, authorId, author } = useSelector((state) => state.showAuthor);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getAuthor(authorId));
            } catch (error) {
                //
            }
        })();
    }, [dispatch, authorId]);

    const onClickClose = (event) => {
        dispatch(setShowAuthorModal(false));
    };

    return (
        <>
            {showAuthorModal && (
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
                                            {author.id !== "" && (
                                                <div className="md:w-10/12 lg:w-9/12 lg:px-40 lg:py-20 px-10 py-10">
                                                    <div className="flex items-start lg:items-center justify-between mb-12 lg:mb-16">
                                                        <div className="lg:flex lg:items-center lg:justify-between lg:w-full">
                                                            <div>
                                                                <div className="text-xs uppercase mb-3">Articles</div>
                                                                <h3 className="text-3xl mb-3 font-bold text-gray-900">
                                                                    {author.name}
                                                                </h3>
                                                            </div>
                                                            <AuthorFollowModal />
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
                                                            {author.articleAuthors.map((articleAuthor) => (
                                                                <li key={articleAuthor.id} className="group relative flex flex-col md:flex-row lg:flex-row overflow-hidden h-auto items-center lg:border-none">
                                                                    <img
                                                                        className="block w-full md:w-48 lg:w-22 flex-none object-cover object-[center_top] bg-cover h-full lg:h-28 rounded"
                                                                        src={
                                                                            articleAuthor.article.thumbnailUrl
                                                                                ? articleAuthor.article.thumbnailUrl
                                                                                : "/images/default-img.jpg"
                                                                        }
                                                                        alt="Article Thumbnail"
                                                                    />
                                                                    <div className="mt-3 lg:mt-0">
                                                                        <div className="space-y-1 md:pl-4 ">
                                                                            <p className="font-semibold text-sm w-[90%] ">
                                                                                {articleAuthor.article.title}
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                {articleAuthor.article.sourceName} / {articleAuthor.article.publishedAtFormatted}
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                Citing regional head Oleksandr Prokudin,
                                                                                Suspilne reports that there are currently
                                                                                3,600 houses in 31 settlements ...
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                            {author.id === "" && (
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