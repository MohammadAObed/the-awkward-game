import handshakes from "../data/Handshake";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import persons from "../data/Person";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import { ScreenNames } from "../constants/ScreenNames";
import { PlayerAchievementMethods } from "../models/PlayerAchievementMethods";
import { PersonMoodSoundCount } from "../constants/Person";

export const initialState = {
  hasShakeStarted: false,
  hasShakeEnded: false,
  personHadEnough: false,
  timesPlayed: 0,
  hasPlayStarted: false,
  showWalkthrough: { screenName: ScreenNames.GameScreen, listOrder: 1 },
  initialPerson: persons[getRandomNumber(persons.length)] || new Person(),
  initialHandshake: handshakes[0] || new Handshake(),
  initialPersonHandshake: handshakes[1] || new Handshake(),
  gifVisible: false,
  achievementResult: PlayerAchievementMethods.Result,
  getPersonMood: { value: 2, name: "Normal", imageIndex: 0, audioIndex: 0 },
  isPersonSoundPlaying: false,
  getPersonMoodSoundCount: PersonMoodSoundCount,
};
