import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../common/Dropdown";
import { useEffect, useState } from "react";
import FolderIcon from "../icons/FolderIcon";
import PlusIcon from "../icons/PlusIcon";
import BlockLoader from "../common/BlockLoader";
import { getUserFolders } from "src/redux/actions/userFolders.action";
import { setNewFolderTitle } from "src/redux/slices/subscribe.slice";
import { createSubscription, unfollowSubscription } from "src/redux/actions/subscribe.action";
import { useLocation, useParams } from "react-router-dom";
import { getAllUserFolderSubscriptions } from "src/redux/actions/allSubscriptions.action";
import { getActiveUserFolder } from "src/redux/actions/activeUserFolder.action";

const SUBSCRIPTION_TYPE = "author";

export default function AuthorFollowModal() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();

    const { userFolders } = useSelector((state) => state.userFolders);
    const { author } = useSelector((state) => state.showAuthor);
    const { newFolderTitle, isLoadingFollow, isLoadingUnfollow } = useSelector((state) => state.subscribe);

    const [showNewFolder, setShowNewFolder] = useState(false);
    const [userFolderSubscription, setUserFolderSubscription] = useState(null);
    const [showAddFolderBtnBooleans, setShowAddFolderBtnBooleans] = useState([]);

    useEffect(() => {
        let showAddbtn = [];
        let subscription = null;
        for (let i = 0; i < userFolders.length; i++) {
            showAddbtn.push({
                isAddBtnShown: false
            });

            let userFolderSubscription = userFolders[i].userFolderSubscriptions.find(userFolderSubscription => userFolderSubscription.authorId === author.id);

            if (userFolderSubscription) subscription = userFolderSubscription;
        }
        setUserFolderSubscription(subscription);
        setShowAddFolderBtnBooleans(showAddbtn);
    }, [userFolders, author]);

    const onClickNewFolder = (event) => {
        setShowNewFolder(true);
    };

    const onChangeTitle = (event) => {
        dispatch(setNewFolderTitle(event.target.value));
    };

    const toggleAddFolder = (event, arrayIndex, action) => {
        let showFolderBooleans = [...showAddFolderBtnBooleans];
        showFolderBooleans.forEach((showFolderBoolean, index) => {
            if (index === arrayIndex) {
                showFolderBoolean.isAddBtnShown = false;
                if (action === "onMouseEnter") {
                    showFolderBoolean.isAddBtnShown = true;
                }
            }
        });
        setShowAddFolderBtnBooleans(showFolderBooleans);
    };

    const onSubmitNewFolder = async (event) => {
        event.preventDefault();

        try {
            await dispatch(createSubscription("new_folder", SUBSCRIPTION_TYPE));
            await dispatch(getUserFolders());

            if (location.pathname === "/collection/all") {
                await dispatch(getAllUserFolderSubscriptions());
            } else if (location.pathname.includes("/collection/")) {
                await dispatch(getActiveUserFolder(id));
            }
        } catch (error) {
            //
        }
    };

    const onClickSubscribeFolder = async (event, userFolder) => {
        setShowNewFolder(false);
        try {
            await dispatch(createSubscription("existing_folder", SUBSCRIPTION_TYPE, userFolder.id),);
            await dispatch(getUserFolders());

            if (location.pathname === "/collection/all") {
                await dispatch(getAllUserFolderSubscriptions());
            } else if (location.pathname.includes("/collection/")) {
                await dispatch(getActiveUserFolder(id));
            }
        } catch (error) {
            //
        }
    };

    const onClickUnfollow = async (event) => {
        setShowNewFolder(false);
        if (window.confirm(`Are you sure you want to unfollow ${author.name}?`)) {
            try {
                await dispatch(unfollowSubscription(SUBSCRIPTION_TYPE, userFolderSubscription.id));
                await dispatch(getUserFolders());

                if (location.pathname === "/collection/all") {
                    await dispatch(getAllUserFolderSubscriptions());
                } else if (location.pathname.includes("/collection/")) {
                    await dispatch(getActiveUserFolder(id));
                }
            } catch (error) {
                //
            }
        }
    };

    return (
        <>
            {!userFolderSubscription && (
                <>
                    <Dropdown>
                        {({ visible, setVisible }) => (
                            <>
                                <Dropdown.Button
                                    visible={visible}
                                    setVisible={setVisible}
                                    className="text-xs border py-1 px-4 uppercase rounded border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                                >
                                    Follow Author
                                </Dropdown.Button>
                                <Dropdown.Actions visible={visible}>
                                    {!showNewFolder && (
                                        <BlockLoader blocking={isLoadingFollow} className="bg-white divide-y divide-gray-100 rounded-lg shadow w-[20em] dark:bg-gray-700 dark:divide-gray-600">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                {userFolders.map((userFolder, index) => (
                                                    <li
                                                        key={userFolder.id}
                                                        className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
                                                        onMouseEnter={(event) => toggleAddFolder(event, index, "onMouseEnter")}
                                                        onMouseLeave={(event) => toggleAddFolder(event, index, "onMouseLeave")}
                                                        onClick={(event) => onClickSubscribeFolder(event, userFolder)}
                                                    >
                                                        <div className="flex gap-2 items-center">
                                                            <FolderIcon width="25px" height="25px" />
                                                            <span>{userFolder.title}</span>
                                                        </div>
                                                        {showAddFolderBtnBooleans[index]?.isAddBtnShown && (
                                                            <div>
                                                                <button type="button" className="flex gap-1 items-center">
                                                                    <PlusIcon stroke="#3c82f6" />
                                                                    <span className="uppercase text-xs font-semibold text-primary-500">Add</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                                {userFolders.length === 0 && (
                                                    <li className="px-4 py-2">
                                                        Organize the feeds you want to follow into folders
                                                    </li>
                                                )}
                                            </ul>
                                            <div className="py-1">
                                                <button type="button" className="px-4 py-2 text-xs text-primary-500 hover:bg-gray-100 w-full text-left uppercase font-semibold flex gap-2 items-center" onClick={onClickNewFolder}>
                                                    <PlusIcon stroke="#3c82f6" />
                                                    <span>New Folder</span>
                                                </button>
                                            </div>
                                        </BlockLoader>
                                    )}
                                    {showNewFolder && (
                                        <form onSubmit={onSubmitNewFolder}>
                                            <BlockLoader blocking={isLoadingFollow}>
                                                <div className="bg-white divide-gray-100 rounded-lg shadow w-[20em] dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                        <li className="px-4 py-2">
                                                            <label htmlFor="folder-name" className="mb-2 text-sm font-medium text-gray-900">Folder name</label>
                                                            <input
                                                                type="text"
                                                                id="folder-name"
                                                                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5"
                                                                placeholder="e.g. Tech"
                                                                value={newFolderTitle}
                                                                onChange={onChangeTitle}
                                                                required
                                                            />
                                                        </li>
                                                    </ul>
                                                    <div className="flex gap-2 px-5 py-2">
                                                        <button type="submit" className="rounded-md bg-primary px-3 py-2 text-xs font-semibold bg-primary-500 hover:bg-primary-600 text-white shadow-sm sm:mt-0 sm:w-auto uppercase">
                                                            Create
                                                        </button>
                                                        <button type="button" className="rounded-md bg-primary px-3 py-2 text-xs font-semibold bg-white text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto uppercase" onClick={(event) => {
                                                            setShowNewFolder(false);
                                                            setVisible(false);
                                                        }}>
                                                            <span>Cancel</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </BlockLoader>
                                        </form>
                                    )}
                                </Dropdown.Actions>
                            </>
                        )}
                    </Dropdown>
                </>
            )}
            {userFolderSubscription && (
                <BlockLoader blocking={isLoadingUnfollow}>
                    <button
                        type="button"
                        className="text-xs border py-1 px-4 uppercase rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={onClickUnfollow}
                    >
                        Unfollow Author
                    </button>
                </BlockLoader>
            )}
        </>
    );
};