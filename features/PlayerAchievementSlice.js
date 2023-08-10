import { createSlice } from "@reduxjs/toolkit";
import persons from "../data/Person";
import { PlayerAchievement } from "../models/PlayerAchievement";
import { PlayerAchievementReset, PlayerAchievementUpdate } from "../controllers/PlayerAchievementController";
import { PlayerAchievementMethods } from "../models/PlayerAchievementMethods";

export const initialState = {
  playerAchievements: [
    new PlayerAchievement(1, persons[0], PlayerAchievementMethods.TheEyebrow.Name).serialize(),
    new PlayerAchievement(2, persons[1], PlayerAchievementMethods.TrumpNo.Name).serialize(),
    new PlayerAchievement(3, persons[2], PlayerAchievementMethods.CatSad.Name).serialize(),
    new PlayerAchievement(4, persons[3], PlayerAchievementMethods.RonaldoSiu.Name).serialize(),
    new PlayerAchievement(5, persons[4], PlayerAchievementMethods.DiCaprioPointing.Name).serialize(),
    new PlayerAchievement(6, persons[5], PlayerAchievementMethods.ElonThumbsUp.Name).serialize(),
    new PlayerAchievement(7, persons[6], PlayerAchievementMethods.CenaYouCantSeeMe.Name).serialize(),
    new PlayerAchievement(8, persons[7], PlayerAchievementMethods.KhabyHowItsDone.Name).serialize(),
    new PlayerAchievement(9, persons[8], PlayerAchievementMethods.MarkOk.Name).serialize(),
    new PlayerAchievement(10, persons[9], PlayerAchievementMethods.SpeedGibberish.Name).serialize(),
    new PlayerAchievement(11, persons[10], PlayerAchievementMethods.SpongeLonely.Name).serialize(),

    new PlayerAchievement(12, persons[2], PlayerAchievementMethods.Cat100.Name).serialize(),
    new PlayerAchievement(13, persons[2], PlayerAchievementMethods.Cat0.Name).serialize(),
    new PlayerAchievement(14, persons[2], PlayerAchievementMethods.CatSunglasses.Name).serialize(),
    new PlayerAchievement(15, persons[2], PlayerAchievementMethods.CatSurprised.Name).serialize(),
    new PlayerAchievement(16, persons[2], PlayerAchievementMethods.CatProcessing.Name).serialize(),
    new PlayerAchievement(17, persons[2], PlayerAchievementMethods.CatTasleekSmile.Name).serialize(),
    new PlayerAchievement(18, persons[2], PlayerAchievementMethods.Cat7BadInARow.Name, 0).serialize(),
    //new PlayerAchievement(4, persons[4], PlayerAchievementMethods.DiCaprioDjangoLaugh.Name).serialize(),
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
