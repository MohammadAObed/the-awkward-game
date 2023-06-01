import persons from "../data/Person";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import { PlayerAchievement } from "../models/PlayerAchievement";

export const PlayerAchievementFunctionName = {
  TheEyebrow: "TheEyebrow",
};
export const PlayerAchievementMsg = {
  TheEyebrow: "Something's cooking and its suspecious 🤨",
};
export const Param = {
  selectedPersonHandshake: new Handshake(),
  selectedPlayerHandshake: new Handshake(),
  person: new Person(),
  playerAchievement: new PlayerAchievement(),
};
export const Result = {
  msg: "",
  showAchievement: false,
};

const [TheRock, Trump, Tate] = persons;

export const PlayerAchievementFunctions = {
  //TheRock
  TheEyebrow({ selectedPersonHandshake, selectedPlayerHandshake, person, playerAchievement } = Param) {
    if (selectedPersonHandshake.id === person.signatureHandshake.id) {
      return { msg: PlayerAchievementMsg.TheEyebrow, showAchievement: true };
    }
    return Result;
  },
};
