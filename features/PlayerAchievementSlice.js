import { createSlice } from "@reduxjs/toolkit";
import persons from "../data/Person";
import { PlayerAchievement, PlayerAchievementMethods } from "../models/PlayerAchievement";
import { PlayerAchievementReset, PlayerAchievementUpdate } from "../controllers/PlayerAchievementController";

const [TheRock, Trump, Tate] = persons;

export const initialState = {
  playerAchievements: [
    new PlayerAchievement(1, TheRock, PlayerAchievementMethods.TheEyebrow.Name).serialize(),
    // new PlayerAchievement(2, Trump).serialize(),
    // new PlayerAchievement(3, Tate).serialize(),
  ],
};

export const PlayerAchievementSlice = createSlice({
  name: "playerAchievement",
  initialState,
  reducers: {
    playerAchievementUpdate: (state, action) => PlayerAchievementUpdate(state, action),
    playerAchievementReset: (state, action) => PlayerAchievementReset(state, action, initialState),
  },
});

export const selectPlayerAchievements = (state) => {
  return state.playerAchievement.playerAchievements;
};

export const selectPlayerAchievementsByPersonId = (state, personId) => {
  return state.playerAchievement.playerAchievements.filter((item) => item.personId === personId) || [new PlayerAchievement()];
};

export const { playerAchievementUpdate, playerAchievementReset } = PlayerAchievementSlice.actions;

export default PlayerAchievementSlice.reducer;
