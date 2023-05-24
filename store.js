import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walkthroughReducer from "./features/walkthroughSlice";

let reducers = combineReducers({
  walkthrough: walkthroughReducer, //can be more than one slice, duh!
});

export default configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
