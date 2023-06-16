import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateFolderModal from "src/components/CreateFolderModal";
import BlockLoader from "src/components/common/BlockLoader";
import AllStackIcon from "src/components/icons/AllStack";
import ArrowCarretIcon from "src/components/icons/ArrowCarret";
import FolderIcon from "src/components/icons/FolderIcon";
import NewsFeedIcon from "src/components/icons/NewsFeedIcon";
import APP from "src/config/app";
import { getUserFolders } from "src/redux/actions/userFolders.action";
import { setIsCreateModalOpen } from "src/redux/slices/createFolder.slice";
import { logout } from "src/redux/actions/authentication.action";
import { useMediaQuery } from 'react-responsive';
import MenuIcon from "src/components/icons/MenuIcon";
import CloseIcon from "src/components/icons/CloseIcon";
import Dropdown from "src/components/common/Dropdown";
import DotsMenuIcon from "src/components/icons/DotsMenuIcon";
import LogoutIcon from "src/components/icons/LogoutIcon";

export default function Sidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isNotMobile = useMediaQuery({ query: `(min-width: 1024px)` })

    const [openSidebar, setOpenSidebar] = useState(false);
    const [totalAllArticleCount, setTotalAllArticleCount] = useState(0);
    const { isLoading, userFolders } = useSelector((state) => state.userFolders);
    const { authenticatedUser, isLoggingOut } = useSelector((state) => state.authentication);

    useEffect(() => {
        if (isNotMobile) {
            setOpenSidebar(true);
        }
    }, [isNotMobile]);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getUserFolders());
            } catch (error) {
                //
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        const count = userFolders.reduce((totalQuantity, userFolder) => totalQuantity + userFolder.totalArticleCount, 0);
        setTotalAllArticleCount(count);
    }, [userFolders]);

    const onClickCreateFolder = (event) => {
        if (!isNotMobile) {
            setOpenSidebar(false);
        }
        dispatch(setIsCreateModalOpen(true));
    };

    const onClickLogout = async (event) => {
        try {
            await dispatch(logout());
            navigate("/", { replace: true });
        } catch (error) {
            navigate("/", { replace: true });
        }
    };

    return (
        <>
            <span
                className="absolute bg-blue-700 rounded-lg h-8 w-9 flex items-center p-1 lg:hidden top-5 left-4 cursor-pointer "
                onClick={() => setOpenSidebar(true)}
            >
                <MenuIcon className="stroke-white w-9 h-7" />
            </span>

            <aside className={`fixed overflow-auto overflow-y-hidden h-auto min-h-screen ${openSidebar ? 'w-[100%] transition-x-0' : 'w-0 transition-x-0'} lg:w-[296px] bg-sidebar border-r z-20 lg:z-0 duration-300`} aria-label="Sidebar">
                <div className={`h-full transition-opacity ${openSidebar ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-between border-b p-4">
                        <div className="flex items-center">
                            <img className="w-7 h-7 mr-2 rounded-lg" src="/images/feedio-logo.jpg" alt="logo" />
                            <strong className="font-semibold text-gray-900">{APP.NAME}</strong>
                        </div>
                        <button className="flex lg:hidden" onClick={() => setOpenSidebar(false)}>
                            <CloseIcon className="h-5 w-5 stroke-gray-700" />
                        </button>
                    </div>
                    <BlockLoader blocking={isLoading}>
                        <ul className="mt-3">
                            <li className={`hover:bg-gray-200 ${location.pathname.includes("/feed") && 'bg-primary-100'}`}>
                                <Link to="/feed/me">
                                    <div className="flex gap-3 align-center pl-4 p-2">
                                        <NewsFeedIcon strokeColor={location.pathname.includes("/feed") ? "#0d5ee6" : "#000000"} />
                                        <div className={`font-semibold text-sm ${location.pathname.includes("/feed") ? 'text-primary-500' : 'text-black'}`}>Today</div>
                                    </div>
                                </Link>
                            </li>
                            {userFolders.length > 0 ? (
                                <li className="mt-2">
                                    <span className="text-xs text-gray-400 uppercase p-4">Feeds</span>
                                    <ul>
                                        <li className={`hover:bg-gray-200 ${location.pathname === `/collection/all` ? 'bg-primary-100' : ''}`}>
                                            <Link to={"/collection/all"} className="flex justify-between mt-2 pl-4 pr-4 p-2" onClick={() => {
                                                isNotMobile ? setOpenSidebar(true) : setOpenSidebar(false)
                                            }}>
                                                <div className="flex gap-3 items-center">
                                                    <AllStackIcon strokeColor={location.pathname === `/collection/all` ? '#3c82f6' : '#898989'} />
                                                    <span className={`font-light text-sm ${location.pathname === `/collection/all` ? 'text-primary-500' : 'text-black'}`}>
                                                        All
                                                    </span>
                                                </div>
                                                <span className={`text-sm font-light text-gray-400 ${location.pathname === `/collection/all` ? 'text-primary-500' : 'text-gray-400'}`}>{totalAllArticleCount > 0 ? totalAllArticleCount : ""}</span>
                                            </Link>
                                        </li>
                                        {userFolders.map((userFolder, index) => (
                                            <li className={`hover:bg-gray-200 ${location.pathname === `/collection/${userFolder.id}` ? 'bg-primary-100' : ''}`} key={index}>
                                                <Link to={`/collection/${userFolder.id}`} className="flex justify-between mt-1 px-4 py-2" onClick={() => {
                                                    isNotMobile ? setOpenSidebar(true) : setOpenSidebar(false)
                                                }}>
                                                    <div className="flex gap-3 items-center">
                                                        <ArrowCarretIcon
                                                            strokeColor={`${location.pathname === `/collection/${userFolder.id}` ? '#3c82f6' : '#898989'}`}
                                                            className={`${location.pathname === `/collection/${userFolder.id}` ? 'rotate-90' : ''}`}
                                                        />
                                                        <span className={`font-light text-sm ${location.pathname === `/collection/${userFolder.id}` ? 'text-primary-500' : 'text-black'}`}>
                                                            {userFolder.title}
                                                        </span>
                                                    </div>
                                                    <span className={`text-sm font-light text-gray-400 ${location.pathname === `/collection/${userFolder.id}` ? 'text-primary-500' : 'text-gray-400'}`}>{userFolder.totalArticleCount > 0 ? userFolder.totalArticleCount : ""}</span>
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="hover:bg-gray-200">
                                            <button type="button" className="font-light text-sm px-11 py-2 w-full text-left" onClick={onClickCreateFolder}>Create New Folder</button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="p-4 mt-2">
                                    <span className="text-xs text-gray-400 uppercase">Feeds</span>
                                    <div className="flex flex-col gap-5 text-center border border-dashed border-gray-300 bg-white mt-2 p-5">
                                        <div className="flex justify-center">
                                            <FolderIcon />
                                        </div>
                                        <span className="text-xs text-gray-500">Keep up with your favorite feeds and keyword alerts</span>
                                        <button type="button" className="rounded uppercase text-xs mt-2 p-2 font-medium text-white bg-primary-500" onClick={onClickCreateFolder}>Create a folder</button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </BlockLoader>
                    {!isLoading && (
                        <div className="absolute bottom-8 p-2 px-3 w-full">
                            <Dropdown>
                                {({ visible, setVisible }) => (
                                    <>
                                        <Dropdown.Button
                                            className="w-full"
                                            visible={visible}
                                            setVisible={setVisible}
                                        >
                                            <div className="relative flex items-center justify-between bg-white rounded-full ">
                                                <div className="flex items-center text-left p-2 mr-3 gap-2 ">
                                                    <div className="">
                                                        <img
                                                            src="/images/img-profile.jpeg"
                                                            className="object-cover h-10 w-10 rounded-full"
                                                            alt="Profile"
                                                        />
                                                    </div>
                                                    <div className="ml-2">
                                                        <div className="text-gray-800">
                                                            {authenticatedUser.name}
                                                        </div>
                                                        <div className="text-gray-500 text-sm">
                                                            {authenticatedUser.email}
                                                        </div>
                                                    </div>
                                                </div>
                                                <DotsMenuIcon className="h-3 w-3 fill-slate-600 absolute right-6" />
                                            </div>
                                        </Dropdown.Button>
                                        <Dropdown.Actions
                                            className="right-3 -top-4 -translate-y-full w-9/12 py-2 cursor-pointer hover:bg-blue-100"
                                            visible={visible}
                                        >
                                            <button
                                                type="button"
                                                className="py-[0.6rem] px-4 text-sm flex items-center"
                                                onClick={onClickLogout}
                                                disabled={isLoggingOut}
                                            >
                                                <LogoutIcon className="h-4 w-4" />
                                                <span className="px-3">Logout</span>
                                            </button>
                                        </Dropdown.Actions>
                                    </>
                                )}
                            </Dropdown>
                        </div>
                    )}
                </div>
            </aside>

            <CreateFolderModal />
        </>
    );
};