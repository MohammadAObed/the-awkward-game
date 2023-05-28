import handshakes from "../data/Handshake";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import persons from "../data/Person";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import { ScreenNames } from "../constants/ScreenNames";

export const initialState = {
  hasShakeStarted: false,
  hasShakeEnded: false,
  personHadEnough: false,
  timesPlayed: 0,
  hasPlayStarted: false,
  showWalkthrough: { screenName: ScreenNames.GameScreen, listOrder: 1 },
  initialPerson: persons[getRandomNumber(persons.length)] || new Person(),
  initialHandshake: handshakes[0] || new Handshake(),
  initialPersonHandshake: handshakes[getRandomNumber(handshakes.length)] || new Handshake(),
};
