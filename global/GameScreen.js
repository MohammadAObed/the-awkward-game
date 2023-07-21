import { GameType } from "../constants/GameScreen";
import { PersonMood } from "../constants/Person";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import { PersonMeter } from "../models/PersonMeter";
import { PlayerAchievement } from "../models/PlayerAchievement";
export const globalState = {
  navigation: {},
  dispatch: function () {},
  playerPersonAchievementList: [new PlayerAchievement()],
  gameType: GameType.NORMAL,
  playerHandshakeAnimation: { values: {} },
  personHandshakeAnimation: { values: {} },
  showWalkthrough: false,
  startWalkthrough: function () {},
  meter: new PersonMeter(),
  //#region value, setValue
  timer: 0,
  setTimer: function () {},
  hasShakeStarted: false,
  setHasShakeStarted: function () {},
  hasShakeEnded: false,
  setHasShakeEnded: function () {},
  selectedPlayerHandshake: new Handshake(),
  setSelectedPlayerHandshake: function () {},
  selectedPersonHandshake: new Handshake(),
  setSelectedPersonHandshake: function () {},
  person: new Person(),
  setPerson: function () {},
  personHadEnough: false,
  setPersonHadEnough: function () {},
  timesPlayed: 0,
  setTimesPlayed: function () {},
  isFirstEncounterEver: true,
  hasPlayStarted: false,
  setHasPlayStarted: function () {},
  modalVisible: false,
  showModal: function () {},
  gifVisible: false,
  setGifVisible: function () {},
  achievementResult: { msg: "", showAchievement: false, image: null, methodName: "" },
  setAchievementResult: function () {},
  personMood: { ...PersonMood.NORMAL, imageIndex: 0, audioIndex: 0 },
  setPersonMood: function () {},
  //#endregion
};
export const nGlobalState = {
  navigation: "navigation",
  dispatch: "dispatch",
  playerPersonAchievementList: "playerPersonAchievementList",
  playerHandshakeAnimation: "playerHandshakeAnimation",
  personHandshakeAnimation: "personHandshakeAnimation",
  startWalkthrough: "startWalkthrough",
  showWalkthrough: "showWalkthrough",
  gameType: "gameType",
  //#region value, setValue
  timer: "timer",
  setTimer: "setTimer",
  hasShakeStarted: "hasShakeStarted",
  setHasShakeStarted: "setHasShakeStarted",
  hasShakeEnded: "hasShakeEnded",
  setHasShakeEnded: "setHasShakeEnded",
  selectedPlayerHandshake: "selectedPlayerHandshake",
  setSelectedPlayerHandshake: "setSelectedPlayerHandshake",
  selectedPersonHandshake: "selectedPersonHandshake",
  setSelectedPersonHandshake: "setSelectedPersonHandshake",
  person: "person",
  setPerson: "setPerson",
  personHadEnough: "personHadEnough",
  setPersonHadEnough: "setPersonHadEnough",
  timesPlayed: "timesPlayed",
  setTimesPlayed: "setTimesPlayed",
  isFirstEncounterEver: "isFirstEncounterEver",
  hasPlayStarted: "hasPlayStarted",
  setHasPlayStarted: "setHasPlayStarted",
  modalVisible: "modalVisible",
  showModal: "showModal",
  gifVisible: "gifVisible",
  setGifVisible: "setGifVisible",
  achievementResult: "achievementResult",
  setAchievementResult: "setAchievementResult",
  personMood: "personMood",
  setPersonMood: "setPersonMood",
  //#endregion
};
