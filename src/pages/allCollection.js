import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PageTitle } from "src/components/common/PageTitle";
import { useEffect, useState } from "react";

import Layout from "src/components/layouts/backend/Layout";
import BlockLoader from "src/components/common/BlockLoader";
import ShowArticleModal from "src/components/feed/ShowArticleModal";
import { setActiveArticle, setShowArticleModal } from "src/redux/slices/exploreArticles.slice";
import { getAllUserFolderSubscriptions } from "src/redux/actions/allSubscriptions.action";

export default function AllCollection() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [subscriptionType, setSubscriptionType] = useState("");
    const { isLoading, userFolderSubscriptions } = useSelector((state) => state.allSubscriptions);
    const [activeUserFolderSubscription, setActiveUserFolderSubscription] = useState({});

    useEffect(() => {
        PageTitle({
            title: "All"
        });
    }, []);

    useEffect(() => {
        if (userFolderSubscriptions.length) {
            setActiveUserFolderSubscription(userFolderSubscriptions[0]);
        }
    }, [userFolderSubscriptions]);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getAllUserFolderSubscriptions());
            } catch (error) {
                //
            }
        })();
    }, [dispatch, id]);

    const onClickChangeTab = (event, userFolderSubscription) => {
        setActiveUserFolderSubscription(userFolderSubscription);
    };

    const onClickFeed = (event, article, userFolderSubscription) => {
        if (userFolderSubscription.sourceId !== "") {
            setSubscriptionType("source");
        } else if (userFolderSubscription.categoryId !== "") {
            setSubscriptionType("category");
        } else if (userFolderSubscription.authorId !== "") {
            setSubscriptionType("author");
        }
        dispatch(setShowArticleModal(true));
        dispatch(setActiveArticle(article));
    };

    return (
        <Layout>
            <BlockLoader blocking={isLoading} className="flex flex-col">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-gray-800">All</h1>
                </div>
                <div className="flex gap-6 mt-8 border-b">
                    {userFolderSubscriptions.map((userFolderSubscription) => (
                        <div key={userFolderSubscription.id}>
                            <button
                                type="button"
                                className={`p-2 rounded-sm text-gray-400 hover:border-b-2 flex items-center gap-3 ${userFolderSubscription.id === activeUserFolderSubscription.id ? 'active-feed-tab' : ''}`}
                                onClick={(event) => onClickChangeTab(event, userFolderSubscription)}
                            >
                                {userFolderSubscription.sourceId !== "" && (
                                    <span>{userFolderSubscription.sourceName}</span>
                                )}
                                {userFolderSubscription.categoryId !== "" && (
                                    <span>{userFolderSubscription.categoryName}</span>
                                )}
                                {userFolderSubscription.authorId !== "" && (
                                    <span>{userFolderSubscription.authorName}</span>
                                )}
                                <span className="text-xs">{userFolderSubscription.userFeeds.length}</span>
                            </button>
                        </div>
                    ))}
                </div>
                {userFolderSubscriptions.map((userFolderSubscription) => (
                    <div key={userFolderSubscription.id}>
                        {userFolderSubscription.id === activeUserFolderSubscription.id && (
                            <>
                                {userFolderSubscription.userFeeds.map((userFeed) => (
                                    <div
                                        key={userFeed.id}
                                        className="group relative p-5 items-start flex flex-col md:flex-row lg:flex-row rounded overflow-hidden h-auto cursor-pointer hover:rounded hover:bg-gray-100 lg:border-none"
                                        onClick={(event) => onClickFeed(event, userFeed.article, userFolderSubscription)}
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
                            </>
                        )}
                    </div>
                ))}
                {userFolderSubscriptions.length === 0 && (
                    <div className="mt-8 text-center">
                        <div className="flex justify-center">
                            <img src="/images/read-article.svg" alt="Read Article" width={306} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Which topics or trends do you want to keep up with?</h3>
                        <p className="text-gray-500 mt-5">You can follow sources, categories, and authors</p>
                        <div className="mt-5">
                            <Link to="/feed/explore" className="rounded uppercase text-xs p-3 font-medium text-white bg-primary-500">Explore</Link>
                        </div>
                    </div>
                )}
            </BlockLoader>
            <ShowArticleModal subscriptionType={subscriptionType} />
        </Layout>
    );
};