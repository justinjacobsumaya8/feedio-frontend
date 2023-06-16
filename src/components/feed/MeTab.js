import laptopTypingAnimation from "src/json/laptop-typing.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { getUserFeed } from "src/redux/actions/userFeed.action";
import { useDispatch, useSelector } from "react-redux";
import BlockLoader from "../common/BlockLoader";
import Pagination from "../common/Paginate";
import { setCurrentPage, setShowFeedBy } from "src/redux/slices/userFeed.slice";
import { Link } from "react-router-dom";
import { setActiveArticle, setShowArticleModal } from "src/redux/slices/exploreArticles.slice";
import ShowArticleModal from "./ShowArticleModal";

export default function MeTab() {
    const dispatch = useDispatch();

    const [subscriptionType, setSubscriptionType] = useState("");
    const { userFolders } = useSelector((state) => state.userFolders);
    const { isLoading, pagination, showFeedBy, showFeedByOptions } = useSelector((state) => state.userFeed);

    // Auto detect data to populate "Showing feed subscribed by"
    useEffect(() => {
        let hasSourceSubscribed = false;
        let hasCategorySubscribed = false;
        let hasAuthorSubscribed = false;
        let showFeedByType = null;

        for (let i = 0; i < userFolders.length; i++) {
            hasSourceSubscribed = Boolean(
                userFolders[i].userFolderSubscriptions.filter(userFolderSubscription => userFolderSubscription.sourceId !== "").length
            );

            if (hasSourceSubscribed) break;

            hasCategorySubscribed = Boolean(
                userFolders[i].userFolderSubscriptions.filter(userFolderSubscription => userFolderSubscription.categoryId !== "").length
            );

            if (hasCategorySubscribed) break;

            hasAuthorSubscribed = Boolean(
                userFolders[i].userFolderSubscriptions.filter(userFolderSubscription => userFolderSubscription.authorId !== "").length
            );

            if (hasAuthorSubscribed) break;
        }

        if (hasSourceSubscribed) {
            showFeedByType = "source";
        } else if (hasCategorySubscribed) {
            showFeedByType = "category";
        } else if (hasAuthorSubscribed) {
            showFeedByType = "author";
        }

        (async function () {
            try {
                await dispatch(getUserFeed(showFeedByType));
            } catch (error) {
                //
            }
        })();
    }, [dispatch, userFolders]);

    const onClickFeed = (event, userFeed) => {
        if (userFeed.sourceId !== "") {
            setSubscriptionType("source");
        } else if (userFeed.categoryId !== "") {
            setSubscriptionType("category");
        } else if (userFeed.authorId !== "") {
            setSubscriptionType("author");
        }
        dispatch(setShowArticleModal(true));
        dispatch(setActiveArticle(userFeed.article));
    };

    const onChangePage = (event) => {
        dispatch(setCurrentPage(event.selected + 1));
        return dispatch(getUserFeed());
    };

    const onChangeShowFeedBy = async (event) => {
        dispatch(setShowFeedBy(event.target.value));

        try {
            await dispatch(getUserFeed());
        } catch (error) {
            //
        }
    };

    return (
        <BlockLoader blocking={isLoading}>
            <div className="flex items-center gap-3 my-3">
                <label htmlFor="follow-by">Showing feed subscribed by</label>
                <select
                    id="follow-by"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block p-1"
                    value={showFeedBy}
                    onChange={onChangeShowFeedBy}
                    disabled={isLoading}
                >
                    {showFeedByOptions.map((showFeedByOption, index) => (
                        <option
                            value={showFeedByOption}
                            key={index}
                        >
                            {showFeedByOption.charAt(0).toUpperCase() + showFeedByOption.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            {pagination.data.map((userFeed, index) => (
                <div
                    key={index}
                    className="group relative p-5 items-start flex flex-col md:flex-row lg:flex-row rounded overflow-hidden h-auto cursor-pointer hover:rounded hover:bg-gray-100 lg:border-none"
                    onClick={(event) => onClickFeed(event, userFeed)}
                >
                    <img
                        className="block w-full md:w-48 lg:w-48 flex-none object-cover object-[center_top] bg-cover h-full lg:h-28 rounded"
                        src={
                            userFeed.article.thumbnailUrl
                                ? userFeed.article.thumbnailUrl
                                : "/images/default-img.jpeg"
                        }
                        alt="Article Thumbnail"
                    />
                    <div className="mt-3 lg:mt-0">
                        <div className="space-y-1 md:pl-4 ">
                            <p className="text-xs text-gray-400">
                                <span>{userFeed.article.categoryName}</span> /{" "}
                                {userFeed.article.publishedAtFormatted}
                            </p>
                            <div className="text-xs mb-8 text-gray-500 flex gap-2">
                                {userFeed.article.articleAuthors.map((articleAuthor, index) => (
                                    <div key={articleAuthor.id} className="flex gap-1">
                                        {index === 0 && <span>By</span>}
                                        <span>{articleAuthor.authorName}</span>
                                        <span className="ms-1">{(userFeed.article.articleAuthors.length - 1) !== index ? "/" : ""}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="font-semibold text-sm w-[90%] ">
                                {userFeed.article.title}
                            </p>

                            <p className="text-sm text-gray-500">
                                {userFeed.article.articleBodies[0].content.length > 200
                                    ? userFeed.article.articleBodies[0].content.slice(0, 200) + "..."
                                    : userFeed.article.articleBodies[0].content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            {pagination.data.length === 0 && (
                <>
                    <div>
                        <Lottie animationData={laptopTypingAnimation} style={{ height: "350px" }} loop={true} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-800">Personalize your Feedio</h3>
                        <p className="text-gray-500 mt-5">The most interesting articles published by the feeds you personally follow will be here.</p>
                        <div className="mt-5">
                            <Link to="/feed/explore" className="rounded uppercase text-xs p-3 font-medium text-white bg-primary-500">Explore</Link>
                        </div>
                    </div>
                </>
            )}
            {(!isLoading && pagination.data.length > 0) && (
                <div className="mt-3 flex justify-center">
                    <Pagination
                        data={pagination}
                        isLoading={isLoading}
                        handlePageClick={onChangePage}
                    />
                </div>
            )}

            <ShowArticleModal subscriptionType={subscriptionType} />
        </BlockLoader>
    );
};