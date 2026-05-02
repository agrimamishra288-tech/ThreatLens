import { configureStore } from '@reduxjs/toolkit';
import bookmarksReducer from './bookmarksSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
    theme: themeReducer,
  },
});
