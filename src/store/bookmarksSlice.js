import { createSlice } from '@reduxjs/toolkit';

const getInitialBookmarks = () => {
  const saved = localStorage.getItem('threatlens_bookmarks');
  return saved ? JSON.parse(saved) : [];
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    items: getInitialBookmarks(),
  },
  reducers: {
    addBookmark: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, note: '' });
        localStorage.setItem('threatlens_bookmarks', JSON.stringify(state.items));
      }
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('threatlens_bookmarks', JSON.stringify(state.items));
    },
    updateNote: (state, action) => {
      const { id, note } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index].note = note;
        localStorage.setItem('threatlens_bookmarks', JSON.stringify(state.items));
      }
    }
  }
});

export const { addBookmark, removeBookmark, updateNote } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
