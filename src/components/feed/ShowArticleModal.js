import { useDispatch, useSelector } from "react-redux";
import {
    setShowArticleModal,
} from "src/redux/slices/exploreArticles.slice";
import { setShowCategoryModal } from "src/redux/slices/showCategory.slice";
import SourceFollowDropdown from "./SourceFollowDropdown";
import { setAuthorId, setShowAuthorModal } from "src/redux/slices/showAuthor.slice";
import ShowCategoryModal from "./ShowCategoryModal";
import ShowAuthorModal from "./ShowAuthorModal";

const SOURCE_SUBSCRIPTION_TYPE = "source";
const ALL_SUBSCRIPTION_TYPE = "all";

export default function ShowArticleModal({
    subscriptionType, // source, category, author
}) {
    const dispatch = useDispatch();

    const { showArticleModal, activeArticle } = useSelector((state) => state.exploreArticles);
    const { showCategoryModal } = useSelector((state) => state.showCategory);
    const { showAuthorModal } = useSelector((state) => state.showAuthor);

    const onClickCategory = (event) => {
        dispatch(setShowCategoryModal(true));
    };

    const onClickAuthor = (event, articleAuthor) => {
        dispatch(setAuthorId(articleAuthor.authorId));
        dispatch(setShowAuthorModal(true));
    };

    const onClickClose = (event) => {
        dispatch(setShowArticleModal(false));
    };

    return (
        <>
            {showArticleModal && (
                <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
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
                                <div className="float-right transform overflow-hidden bg-white text-left shadow-xl transition-all min-w-[75%] w-[907px] overflow-y-auto">
                                    <div className="bg-white h-screen">
                                        {(subscriptionType === SOURCE_SUBSCRIPTION_TYPE || subscriptionType === ALL_SUBSCRIPTION_TYPE) ? (
                                            <SourceFollowDropdown />
                                        ) : (
                                            <div className="absolute right-5 top-5">
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
                                        )}
                                        <div className="flex justify-center mx-3 ">
                                            <div className="md:w-10/12 lg:w-9/12 lg:px-40 lg:py-20 px-10 py-10 ">
                                                <a href={activeArticle.webUrl} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700">
                                                    <h3
                                                        className="text-3xl mb-3 font-bold "
                                                        id="modal-title"
                                                    >
                                                        {activeArticle.title}
                                                    </h3>
                                                </a>
                                                <div className="text-sm mb-5 text-gray-500">
                                                    <button
                                                        type="button"
                                                        onClick={onClickCategory}
                                                        className="underline cursor-pointer hover:text-blue-600"
                                                    >
                                                        {activeArticle.categoryName}
                                                    </button>{" "}
                                                    / {activeArticle.publishedAtFormatted}
                                                </div>
                                                <div className="text-sm mb-8 text-gray-500 flex gap-2">
                                                    {activeArticle.articleAuthors.map((articleAuthor, index) => (
                                                        <div key={articleAuthor.id} className="flex gap-1">
                                                            {index === 0 && <span>By</span>}
                                                            <button
                                                                type="button"
                                                                onClick={(event) => onClickAuthor(event, articleAuthor)}
                                                                className="underline cursor-pointer hover:text-blue-600"
                                                            >
                                                                {articleAuthor.authorName}
                                                            </button>
                                                            <span className="ms-1">{(activeArticle.articleAuthors.length - 1) !== index ? "/" : ""}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <a href={activeArticle.webUrl} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        className="block w-auto h-auto mb-12"
                                                        src={
                                                            activeArticle.thumbnailUrl
                                                                ? activeArticle.thumbnailUrl
                                                                : "/images/default-img.jpg"
                                                        }
                                                        alt="Article Thumbnail"
                                                    />
                                                </a>
                                                <div>
                                                    {activeArticle.articleBodies.map((articleBody) => (
                                                        <div className="mt-3" key={articleBody.id}>{articleBody.content}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showCategoryModal && <ShowCategoryModal />}
                    {showAuthorModal && <ShowAuthorModal />}
                </div>
            )}
        </>
    );
};