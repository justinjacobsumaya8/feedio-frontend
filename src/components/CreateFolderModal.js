import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "src/redux/actions/createFolder.action";
import { getUserFolders } from "src/redux/actions/userFolders.action";
import { setIsCreateModalOpen, setTitle } from "src/redux/slices/createFolder.slice";

export default function CreateFolderModal() {
    const dispatch = useDispatch();

    const { title, isCreateModalOpen } = useSelector((state) => state.createFolder);

    const onClickClose = (event) => {
        dispatch(setIsCreateModalOpen(false));
    };

    const onChangeTitle = (event) => {
        dispatch(setTitle(event.target.value));
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await dispatch(createFolder());
            await dispatch(getUserFolders());
            dispatch(setIsCreateModalOpen(false));
        } catch (error) {
            //
        }
    };

    return (
        <>
            {isCreateModalOpen && (
                <div>
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="h-screen min-h-full">
                            <div className="flex justify-end">
                                <div className="bg-white h-10 p-2 rounded-l-full hidden lg:block">
                                    <button type="button" className="text-gray-400 hover:text-gray-300" onClick={onClickClose}>
                                        <span className="hidden">Close</span>
                                        <img src="/images/close.svg" alt="Close" className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="float-right transform overflow-hidden bg-white text-left shadow-xl transition-all min-w-[75%] w-[907px]">
                                    <div className="bg-white h-screen">
                                        <div className="lg:px-28 lg:py-28 px-10 py-10">
                                            <form onSubmit={onSubmit}>
                                                <h3 className="text-3xl font-bold text-gray-900" id="modal-title">Create New folder</h3>
                                                <div className="text-gray-500 mt-2">Group your feeds into a private folder by topic, source, category, or author.</div>
                                                <div className="mt-10">
                                                    <div>
                                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title <span className="text-gray-400 font-normal text-xs">Required</span></label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                            placeholder="Topic, source, category, author, etc"
                                                            required
                                                            value={title}
                                                            onChange={onChangeTitle}
                                                        />
                                                    </div>
                                                    <div className="mt-3 flex gap-3">
                                                        <button
                                                            type="submit"
                                                            className="rounded uppercase text-xs mt-2 p-3 font-medium text-white bg-primary-500 hover:bg-primary-600"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="rounded uppercase text-xs mt-2 p-2 font-medium text-gray-600 border hover:bg-gray-50"
                                                            onClick={onClickClose}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};