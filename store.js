import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage"; //dont uncomment this, gives an err just by importing it
import walkthroughReducer from "./features/walkthroughSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  // blacklist: ["walkthrough"],
};

const reducers = combineReducers({
  walkthrough: walkthroughReducer, //can be more than one slice, duh!
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //bcz new redux does not have action types in reducers, so it gives an err
      },
    }),
});
export const persistor = persistStore(store);
