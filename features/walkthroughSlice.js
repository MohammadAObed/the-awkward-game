import { createSlice } from "@reduxjs/toolkit";
import { WalkthroughReset, WalkthroughUpdate } from "../controllers/WalkthroughController";
import { Walkthrough } from "../models/Walkthrough";
import { ScreenNames } from "../constants/ScreenNames";
//containing all items
export const initialState = {
  walkthroughes: [
    new Walkthrough(ScreenNames.GameScreen, 1).serialize(),
    new Walkthrough(ScreenNames.GameScreen, 2).serialize(),
    new Walkthrough(ScreenNames.PersonsScreen, 1).serialize(),
    new Walkthrough(ScreenNames.PersonsScreen, 2).serialize(),
    new Walkthrough(ScreenNames.StartScreen, 1).serialize(),
  ],
};

export const walkthroughSlice = createSlice({
  name: "walkthrough",
  initialState,
  reducers: {
    walkthroughUpdate: (state, action) => WalkthroughUpdate(state, action),
    walkthroughReset: (state, action) => WalkthroughReset(state, action, initialState),
  },
});

export const selectWalkthroughSlice = (state) => {
  return state.walkthrough.walkthroughes;
};

export const selectWalkthroughSliceByScreenNameAndListOrder = (state, screenName = "", listOrder = 1) => {
  return state.walkthrough.walkthroughes.find((item) => item.screenName === screenName && item.listOrder === listOrder) || new Walkthrough();
};

export const { walkthroughUpdate, walkthroughReset } = walkthroughSlice.actions;

export default walkthroughSlice.reducer;
