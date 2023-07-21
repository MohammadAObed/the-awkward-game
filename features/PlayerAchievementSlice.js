import { createSlice } from "@reduxjs/toolkit";
import persons from "../data/Person";
import { PlayerAchievement } from "../models/PlayerAchievement";
import { PlayerAchievementReset, PlayerAchievementUpdate } from "../controllers/PlayerAchievementController";
import { PlayerAchievementMethods } from "../models/PlayerAchievementMethods";

export const initialState = {
  playerAchievements: [
    new PlayerAchievement(1, persons[0], PlayerAchievementMethods.TheEyebrow.Name).serialize(),
    new PlayerAchievement(2, persons[4], PlayerAchievementMethods.DiCaprioDjangoLaugh.Name).serialize(),
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

export const selectPlayerAchievementByMethodName = (state, methodName) => {
  return state.playerAchievement.playerAchievements.find((item) => item.methodName === methodName) || new PlayerAchievement();
};

export const { playerAchievementUpdate, playerAchievementReset } = PlayerAchievementSlice.actions;

export default PlayerAchievementSlice.reducer;
