import { GameType } from "../constants/GameScreen";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
export const globalState = {
  navigation: {},
  dispatch: function () {},
  gameType: GameType.Normal,
  playerHandshakeAnimation: { values: {} },
  personHandshakeAnimation: { values: {} },
  showWalkthrough: false,
  startWalkthrough: function () {},
  timer: 0,
  setTimer: function () {},
  hasShakeStarted: false,
  setHasShakeStarted: function () {},
  hasShakeEnded: false,
  setHasShakeEnded: function () {},
  selectedHandshake: new Handshake(),
  setSelectedHandshake: function () {},
  selectedPersonHandshake: new Handshake(),
  setSelectedPersonHandshake: function () {},
  person: new Person(),
  setPerson: function () {},
  personHadEnough: false,
  setPersonHadEnough: function () {},
  timesPlayed: 0,
  setTimesPlayed: function () {},
  isFirstTime: true,
  setIsFirstTime: function () {},
  hasPlayStarted: false,
  setHasPlayStarted: function () {},
  modalVisible: false,
  showModal: function () {},
};
export const nGlobalState = {
  navigation: "navigation",
  dispatch: "dispatch",
  playerHandshakeAnimation: "playerHandshakeAnimation",
  personHandshakeAnimation: "personHandshakeAnimation",
  startWalkthrough: "startWalkthrough",
  showWalkthrough: "showWalkthrough",
  timer: "timer",
  setTimer: "setTimer",
  hasShakeStarted: "hasShakeStarted",
  setHasShakeStarted: "setHasShakeStarted",
  hasShakeEnded: "hasShakeEnded",
  setHasShakeEnded: "setHasShakeEnded",
  selectedHandshake: "selectedHandshake",
  setSelectedHandshake: "setSelectedHandshake",
  selectedPersonHandshake: "selectedPersonHandshake",
  setSelectedPersonHandshake: "setSelectedPersonHandshake",
  person: "person",
  setPerson: "setPerson",
  personHadEnough: "personHadEnough",
  setPersonHadEnough: "setPersonHadEnough",
  timesPlayed: "timesPlayed",
  setTimesPlayed: "setTimesPlayed",
  isFirstTime: "isFirstTime",
  setIsFirstTime: "setIsFirstTime",
  hasPlayStarted: "hasPlayStarted",
  setHasPlayStarted: "setHasPlayStarted",
  modalVisible: "modalVisible",
  showModal: "showModal",
  // gameType: "gameType",
};
