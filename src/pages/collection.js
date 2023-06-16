import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "src/components/common/PageTitle";
import { useEffect, useState } from "react";
import Layout from "src/components/layouts/backend/Layout";
import { deleteFolder, getActiveUserFolder, submitNewTitle } from "src/redux/actions/activeUserFolder.action";
import Dropdown from "src/components/common/Dropdown";
import BlockLoader from "src/components/common/BlockLoader";
import ShowArticleModal from "src/components/feed/ShowArticleModal";
import { setActiveArticle, setShowArticleModal } from "src/redux/slices/exploreArticles.slice";
import { getUserFolders } from "src/redux/actions/userFolders.action";

export default function Collection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const [isRenameActive, setIsRenameActive] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [subscriptionType, setSubscriptionType] = useState("");
    const { isLoading, userFolder } = useSelector((state) => state.activeUserFolder);
    const [activeUserFolderSubscription, setActiveUserFolderSubscription] = useState({});

    useEffect(() => {
        PageTitle({
            title: userFolder.title
        });
        setNewTitle(userFolder.title)
    }, [userFolder.title]);

    useEffect(() => {
        if (userFolder.userFolderSubscriptions.length) {
            setActiveUserFolderSubscription(userFolder.userFolderSubscriptions[0]);
        }
    }, [userFolder]);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getActiveUserFolder(id));
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

    const onChangeTitle = (event) => {
        setNewTitle(event.target.value);
    };

    const onSubmitRenameTitle = async (event) => {
        event.preventDefault();

        setIsRenameActive(false);
        try {
            await dispatch(submitNewTitle(id, newTitle));
            await dispatch(getUserFolders());
            await dispatch(getActiveUserFolder(id));
        } catch (error) {
            //
        }
    };

    const onClickDelete = async (event) => {
        if (!window.confirm("Are you sure you want to delete this folder?")) {
            return false;
        }

        try {
            await dispatch(deleteFolder(id));
            navigate("/collection/all", { replace: true });
        } catch (error) {
            navigate("/collection/all", { replace: true });
        }
    };

    return (
        <Layout>
            <BlockLoader blocking={isLoading} className="flex flex-col">
                <div className="flex items-center justify-between">
                    {!isRenameActive && (
                        <h1 className="text-4xl font-bold text-gray-800">{newTitle}</h1>
                    )}
                    {isRenameActive && (
                        <form onSubmit={onSubmitRenameTitle} className="flex gap-2">
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                                placeholder={newTitle}
                                required
                                value={newTitle}
                                onChange={onChangeTitle}
                                autoFocus
                            />
                            <button type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-3 lg:px-5 py-2 text-center">
                                Submit
                            </button>
                            <button type="button" className="rounded-md bg-primary px-3 py-2 text-xs font-semibold bg-white text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto" onClick={(event) => setIsRenameActive(false)}>
                                Cancel
                            </button>
                        </form>
                    )}
                    <Dropdown>
                        {({ visible, setVisible }) => (
                            <>
                                <Dropdown.Button visible={visible} setVisible={setVisible}>
                                    <img src="/images/cog.svg" alt="Cog" />
                                </Dropdown.Button>
                                <Dropdown.Actions visible={visible}>
                                    <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                                                    onClick={(event) => {
                                                        setIsRenameActive(true);
                                                        setVisible(false);
                                                    }}
                                                >
                                                    Rename
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="py-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-full text-left"
                                                onClick={(event) => {
                                                    onClickDelete(event);
                                                    setVisible(false);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </Dropdown.Actions>
                            </>
                        )}
                    </Dropdown>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <div className="flex gap-6 mt-8 border-b">
                        {userFolder.userFolderSubscriptions.map((userFolderSubscription) => (
                            <div key={userFolderSubscription.id}>
                                <button
                                    type="button"
                                    className={`p-2 rounded-sm text-gray-400 hover:border-b-2 flex items-center gap-3 whitespace-nowrap ${userFolderSubscription.id === activeUserFolderSubscription.id ? 'active-feed-tab' : ''}`}
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
                </div>
                {userFolder.userFolderSubscriptions.map((userFolderSubscription) => (
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
                                            <div className="lg:space-y-1 space-y-2 md:pl-4 ">
                                                <p className="text-xs text-gray-400">
                                                    <span>{userFeed.article.categoryName}</span> /{" "}
                                                    {userFeed.article.publishedAtFormatted}
                                                </p>
                                                <div className="text-xs mb-8 text-gray-400 flex gap-2">
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
                {userFolder.userFolderSubscriptions.length === 0 && (
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