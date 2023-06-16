import { combineReducers, configureStore } from '@reduxjs/toolkit'
import activeUserFolderSlice from './slices/activeUserFolder.slice'
import alertSlice from './slices/alert.slice'
import authenticationSlice from './slices/authentication.slice'
import createFolderSlice from './slices/createFolder.slice'
import commonCategoriesSlice from './slices/common/categories.slice'
import commonSourcesSlice from './slices/common/sources.slice'
import exploreArticlesSlice from './slices/exploreArticles.slice'
import forgotPasswordSlice from './slices/forgotPassword.slice'
import registrationSlice from './slices/registration.slice'
import showAuthorSlice from './slices/showAuthor.slice'
import showCategorySlice from './slices/showCategory.slice'
import subscribeSlice from './slices/subscribe.slice'
import userFeedSlice from './slices/userFeed.slice'
import userFoldersSlice from './slices/userFolders.slice'
import allSubscriptionsSlice from './slices/allSubscriptions.slice'

const combinedReducer = combineReducers({
    activeUserFolder: activeUserFolderSlice,
    alert: alertSlice,
    allSubscriptions: allSubscriptionsSlice,
    authentication: authenticationSlice,
    commonCategories: commonCategoriesSlice,
    commonSources: commonSourcesSlice,
    createFolder: createFolderSlice,
    exploreArticles: exploreArticlesSlice,
    forgotPassword: forgotPasswordSlice,
    registration: registrationSlice,
    showAuthor: showAuthorSlice,
    showCategory: showCategorySlice,
    subscribe: subscribeSlice,
    userFeed: userFeedSlice,
    userFolders: userFoldersSlice,
});

const rootReducer = (state, action) => {
    // Check if action is for logout, then reset all reducers
    if (action.type === "authentication/saveLogout") {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
});