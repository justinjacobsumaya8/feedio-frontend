import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import { getCategories } from "src/redux/actions/common/categories.action";
import { getSources } from "src/redux/actions/common/sources.action";
import { getArticles } from "src/redux/actions/exploreArticles.action";
import {
    setFilter,
    setShowAddFilter,
} from "src/redux/slices/exploreArticles.slice";
import BlockLoader from "../common/BlockLoader";

export default function AddFilter() {
    const dispatch = useDispatch();
    const { showAddFilter, filter } = useSelector(
        (state) => state.exploreArticles
    );
    const { isLoading: isLoadingCommonCategories, categories } = useSelector(
        (state) => state.commonCategories
    );
    const { isLoading: isLoadingCommonSources, sources } = useSelector(
        (state) => state.commonSources
    );

    const dropdownRef = useRef(null);
    const [tempDateRange, setTempDateRange] = useState(filter.range);
    const [tempCategoryId, setTempCategoryId] = useState(filter.categoryId);
    const [tempSourceId, setTempSourceId] = useState(filter.sourceId);

    useEffect(() => {
        (async function () {
            try {
                await dispatch(getCategories());
                await dispatch(getSources());
            } catch (error) {
                //
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dispatch(setShowAddFilter(false));
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, dispatch]);

    const onClickClose = (event) => {
        dispatch(setShowAddFilter(false));
    };

    const onChangeDatePicker = (value) => {
        setTempDateRange(value);
    };

    const onChangeCategory = (event) => {
        setTempCategoryId(parseInt(event.target.value));
    };

    const onChangeSource = (event) => {
        setTempSourceId(parseInt(event.target.value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(
            setFilter({
                range: tempDateRange,
                sourceId: tempSourceId,
                categoryId: tempCategoryId,
            })
        );
        dispatch(getArticles());
        dispatch(setShowAddFilter(false));
    };

    return (
        <>
            {showAddFilter && (
                <div className="absolute w-[20rem] top-12 z-10 rounded border border-lavender-gray bg-white shadow-md" ref={dropdownRef}>
                    <form
                        onSubmit={onSubmit}
                        className="border-0 rounded-xl shadow-lg bg-white outline-none focus:outline-none static"
                    >
                        <div className=" p-6 pt-5 overflow-y-auto overflow-scroll">
                            <div>
                                <label
                                    htmlFor="date-range"
                                    className="block mb-2 text-xs font-medium text-gray-900"
                                >
                                    Published Date
                                </label>
                                <Datepicker
                                    containerClassName="!static"
                                    value={tempDateRange}
                                    onChange={onChangeDatePicker}
                                    inputId="date-range"
                                    maxDate={new Date()}
                                    inputClassName="border relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded tracking-wide font-light text-sm placeholder-gray-400 bg-gray-50 focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-blue-500 focus:ring-blue-500/20"
                                    toggleClassName="absolute text-slate-400 right-0 px-8 py-[0.6rem] "
                                />
                            </div>
                            <div className="mt-3">
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-xs font-medium text-gray-900"
                                >
                                    Category
                                </label>
                                <BlockLoader blocking={isLoadingCommonCategories}>
                                    <select
                                        id="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={tempCategoryId}
                                        onChange={onChangeCategory}
                                    >
                                        <option value="">--</option>
                                        {categories.map((category) => (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </BlockLoader>
                            </div>
                            <div className="mt-3">
                                <label
                                    htmlFor="source"
                                    className="block mb-2 text-xs font-medium text-gray-900"
                                >
                                    Source
                                </label>
                                <BlockLoader blocking={isLoadingCommonSources}>
                                    <select
                                        id="source"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={tempSourceId}
                                        onChange={onChangeSource}
                                    >
                                        <option value="">--</option>
                                        {sources.map((source) => (
                                            <option value={source.id} key={source.id}>
                                                {source.name}
                                            </option>
                                        ))}
                                    </select>
                                </BlockLoader>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 px-6 pb-6 pt-0">
                            <button
                                type="submit"
                                className="rounded-md w-full bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm bg-blue-500 hover:bg-blue-600 border-blue-700"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                className="rounded-md w-full bg-primary px-3 py-2 text-sm font-semibold bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                onClick={onClickClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};