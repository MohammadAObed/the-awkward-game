import { createSlice } from "@reduxjs/toolkit";
import { SettingsUpdate, SettingstReset } from "../controllers/SettingsController";
import { Setting, SettingsNames } from "../models/Setting";
//containing all items
export const initialState = {
  settings: [
    new Setting(1, SettingsNames.AiVoice, true).serialize(),
    new Setting(2, SettingsNames.Reached100AchievmentsHidden, false).serialize(),
  ],
};

export const SettingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    settingsUpdate: (state, action) => SettingsUpdate(state, action),
    settingsReset: (state, action) => SettingstReset(state, action, initialState),
  },
});

export const selectSettings = (state) => {
  return state.settings.settings;
};

export const selectSettingsByName = (state, name) => {
  return state.settings.settings.find((item) => item.name === name);
};

export const { settingsUpdate, settingsReset } = SettingSlice.actions;

export default SettingSlice.reducer;
