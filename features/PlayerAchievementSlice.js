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

    new PlayerAchievement(12, persons[0], PlayerAchievementMethods.Rock0.Name).serialize(),
    new PlayerAchievement(13, persons[0], PlayerAchievementMethods.Rock100.Name).serialize(),
    new PlayerAchievement(14, persons[1], PlayerAchievementMethods.Trump0.Name).serialize(),
    new PlayerAchievement(15, persons[1], PlayerAchievementMethods.Trump100.Name).serialize(),
    new PlayerAchievement(16, persons[2], PlayerAchievementMethods.Cat0.Name).serialize(),
    new PlayerAchievement(17, persons[2], PlayerAchievementMethods.Cat100.Name).serialize(),
    new PlayerAchievement(18, persons[3], PlayerAchievementMethods.Ronaldo0.Name).serialize(),
    new PlayerAchievement(19, persons[3], PlayerAchievementMethods.Ronaldo100.Name).serialize(),
    new PlayerAchievement(20, persons[4], PlayerAchievementMethods.DiCaprio0.Name).serialize(),
    new PlayerAchievement(21, persons[4], PlayerAchievementMethods.DiCaprio100.Name).serialize(),
    new PlayerAchievement(22, persons[5], PlayerAchievementMethods.Elon0.Name).serialize(),
    new PlayerAchievement(23, persons[5], PlayerAchievementMethods.Elon100.Name).serialize(),
    new PlayerAchievement(24, persons[6], PlayerAchievementMethods.Cena0.Name).serialize(),
    new PlayerAchievement(25, persons[6], PlayerAchievementMethods.Cena100.Name).serialize(),
    new PlayerAchievement(26, persons[7], PlayerAchievementMethods.Khaby0.Name).serialize(),
    new PlayerAchievement(27, persons[7], PlayerAchievementMethods.Khaby100.Name).serialize(),
    new PlayerAchievement(28, persons[8], PlayerAchievementMethods.Mark0.Name).serialize(),
    new PlayerAchievement(29, persons[8], PlayerAchievementMethods.Mark100.Name).serialize(),
    new PlayerAchievement(30, persons[9], PlayerAchievementMethods.Speed0.Name).serialize(),
    new PlayerAchievement(31, persons[9], PlayerAchievementMethods.Speed100.Name).serialize(),
    new PlayerAchievement(32, persons[10], PlayerAchievementMethods.SpongeBob0.Name).serialize(),
    new PlayerAchievement(33, persons[10], PlayerAchievementMethods.SpongeBob100.Name).serialize(),

    new PlayerAchievement(34, persons[0], PlayerAchievementMethods.RockSeeYouSoon.Name).serialize(),
    new PlayerAchievement(35, persons[0], PlayerAchievementMethods.RockStop.Name).serialize(),
    new PlayerAchievement(36, persons[0], PlayerAchievementMethods.RockSurprised.Name, 0).serialize(),
    new PlayerAchievement(37, persons[0], PlayerAchievementMethods.RockWink.Name).serialize(),

    new PlayerAchievement(38, persons[1], PlayerAchievementMethods.TrumpNiceThumb.Name, 0).serialize(),
    new PlayerAchievement(39, persons[1], PlayerAchievementMethods.TrumpFakeNews.Name).serialize(),

    new PlayerAchievement(40, persons[2], PlayerAchievementMethods.CatSunglasses.Name).serialize(),
    new PlayerAchievement(41, persons[2], PlayerAchievementMethods.CatSurprised.Name).serialize(),
    new PlayerAchievement(42, persons[2], PlayerAchievementMethods.CatProcessing.Name).serialize(),
    new PlayerAchievement(43, persons[2], PlayerAchievementMethods.CatTasleekSmile.Name).serialize(),
    new PlayerAchievement(44, persons[2], PlayerAchievementMethods.Cat7BadInARow.Name, 0).serialize(),

    new PlayerAchievement(45, persons[3], PlayerAchievementMethods.RonaldoSuiAudio.Name).serialize(),
    new PlayerAchievement(46, persons[3], PlayerAchievementMethods.Ronaldo12Sui.Name, 0).serialize(),
    new PlayerAchievement(47, persons[3], PlayerAchievementMethods.RonaldoDontTouchMe.Name).serialize(),

    new PlayerAchievement(48, persons[4], PlayerAchievementMethods.DiCaprioDjangoLaugh.Name).serialize(),
    new PlayerAchievement(49, persons[4], PlayerAchievementMethods.DiCaprioFiftyFifty.Name).serialize(),
    new PlayerAchievement(50, persons[4], PlayerAchievementMethods.DiCaprioYouSlick.Name).serialize(),
    new PlayerAchievement(51, persons[4], PlayerAchievementMethods.DiCaprioShady.Name).serialize(),

    new PlayerAchievement(52, persons[5], PlayerAchievementMethods.ElonPointing.Name).serialize(),
    new PlayerAchievement(53, persons[5], PlayerAchievementMethods.ElonThisis.Name).serialize(),

    new PlayerAchievement(54, persons[6], PlayerAchievementMethods.CenaBingChiling.Name).serialize(),
    new PlayerAchievement(55, persons[6], PlayerAchievementMethods.CenaConfused.Name).serialize(),

    new PlayerAchievement(56, persons[7], PlayerAchievementMethods.KhabyMax.Name).serialize(),
    new PlayerAchievement(57, persons[7], PlayerAchievementMethods.KhabyConfused.Name).serialize(),

    new PlayerAchievement(58, persons[8], PlayerAchievementMethods.MarkBlink.Name).serialize(),
    new PlayerAchievement(59, persons[8], PlayerAchievementMethods.MarkFist.Name).serialize(),
    new PlayerAchievement(60, persons[8], PlayerAchievementMethods.MarkTiredSmile.Name, 0).serialize(),

    new PlayerAchievement(61, persons[9], PlayerAchievementMethods.SpeedMaxPlayed.Name).serialize(),
    new PlayerAchievement(62, persons[9], PlayerAchievementMethods.SpeedWhat.Name).serialize(),
    new PlayerAchievement(63, persons[9], PlayerAchievementMethods.SpeedWakey.Name).serialize(),

    new PlayerAchievement(64, persons[10], PlayerAchievementMethods.SpongeConfused.Name).serialize(),
    new PlayerAchievement(65, persons[10], PlayerAchievementMethods.SpongeMax.Name).serialize(),
    new PlayerAchievement(66, persons[10], PlayerAchievementMethods.SpongeTired.Name, 0).serialize(),
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
