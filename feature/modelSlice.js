import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  commentModelOpen: { model: false, id: '' },
  twitterModelOpen: false,
};
export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    openCommentModel: (state, action) => {
      state.commentModelOpen.model = true;
      state.commentModelOpen.id = action.payload;
    },
    closeCommentModel: (state) => {
      state.commentModelOpen.model = false;
    },
    twitterModelOpen: (state) => {
      state.twitterModelOpen = true;
    },
    twitterModelClose: (state) => {
      state.twitterModelOpen = false;
    },
  },
});

export const {
  openCommentModel,
  closeCommentModel,
  twitterModelClose,
  twitterModelOpen,
} = modelSlice.actions;
export default modelSlice.reducer;
