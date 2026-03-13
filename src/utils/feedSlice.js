import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeProfileFromFeed: (state, action) => {
      const modifiedFeed = state.filter((p) => p._id !== action.payload);
      return modifiedFeed;
    },
  },
});
export const { addFeed, removeProfileFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
