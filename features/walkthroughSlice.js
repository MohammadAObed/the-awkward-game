import { createSlice } from "@reduxjs/toolkit";
import { WalkthroughUpdate } from "../controllers/WalkthroughController";
import { Walkthrough } from "../models/Walkthrough";
import { ScreenNames } from "../constants/ScreenNames";
//containing all items
const initialState = {
  walkthroughes: [
    new Walkthrough(ScreenNames.QuickGameRoundScreen, 1).serialize(),
    new Walkthrough(ScreenNames.QuickGameRoundScreen, 2).serialize(),
  ],
};

export const walkthroughSlice = createSlice({
  name: "walkthrough",
  initialState,
  reducers: {
    walkthroughUpdate: (state, action) => WalkthroughUpdate(state, action),
  },
});

export const selectWalkthroughSlice = (state) => {
  return state.walkthrough.walkthroughes;
};

export const selectWalkthroughSliceByScreenNameAndListOrder = (state, screenName = "", listOrder = 1) => {
  return state.walkthrough.walkthroughes.find((item) => item.screenName === screenName && item.listOrder === listOrder);
};

export const { walkthroughUpdate } = walkthroughSlice.actions;

export default walkthroughSlice.reducer;
