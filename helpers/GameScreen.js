import { FinishMsgTimeout, GameType, MaxTimesPlayed, MaxTimesSoundPlayed, TimerStartValue } from "../constants/GameScreen";
import { ScreenNames } from "../constants/ScreenNames";
import handshakes from "../data/Handshake";
import { meterUpdate } from "../features/PersonMeterSlice";
import { playerAchievementUpdate } from "../features/PlayerAchievementSlice";
import { globalState } from "../global/GameScreen";
import { Handshake } from "../models/Handshake";
import { Person, PersonAudio } from "../models/Person";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import { PersonMood } from "../constants/Person";
import { PlayerAchievementMethods } from "../models/PlayerAchievementMethods";
import { playAudio } from "../utils/common/playAudio";

//? Look for export keyword to know which functions are used outside

//#region private
function mHandlePlayerAchievements(param = PlayerAchievementMethods.Param) {
  let result = PlayerAchievementMethods.Result;
  if (globalState.isFirstEncounterEver) return result;
  for (const playerAchievement of globalState.playerPersonAchievementList) {
    if (playerAchievement.hasUnlocked) continue;
    param.playerPersonAchievement = playerAchievement;
    result = checkAchievement(param);
    if (result.showAchievement === true) {
      globalState.dispatch(playerAchievementUpdate({ id: playerAchievement.id, hasUnlocked: true, extraValue: result.extraValue }));
      return result;
    }
    if (result.extraValue !== null && result.extraValue !== param.playerPersonAchievement.extraValue) {
      globalState.dispatch(playerAchievementUpdate({ id: playerAchievement.id, extraValue: result.extraValue }));
    }
  }
  return result;
}
function checkAchievement(param = PlayerAchievementMethods.Param) {
  let result =
    typeof PlayerAchievementMethods[param.playerPersonAchievement.methodName]?.execute == "function"
      ? PlayerAchievementMethods[param.playerPersonAchievement.methodName]?.execute(param)
      : PlayerAchievementMethods.Result;
  return result;
}
function getHandshake(ids = []) {
  let randIndex = getRandomNumber(ids.length);
  let handShakeId = ids[randIndex];
  return handshakes.find((h) => h.id === handShakeId) || new Handshake();
}
function generateMoodValue({ selectedPersonHandshake = new Handshake(), selectedPlayerHandshake = new Handshake(), person = new Person() }) {
  let value = 0;
  const { specialChance, highChance, lowChance, medChance } = person.handshakesOccurance;

  if (selectedPersonHandshake.id === selectedPlayerHandshake.id) {
    value += 1;
    if (selectedPersonHandshake.id === person.signatureHandshake.id) {
      value += 2;
    } else if (highChance.ids.includes(selectedPersonHandshake.id)) {
      value += 1;
    } else if (medChance.ids.includes(selectedPersonHandshake.id)) {
      value += 2;
    } else if (lowChance.ids.includes(selectedPersonHandshake.id)) {
      value += 3;
    } else if (specialChance.ids.includes(selectedPersonHandshake.id)) {
      value += 2;
    }
  } else {
    value -= 2;
    if (selectedPersonHandshake.id === person.signatureHandshake.id) {
      value -= 2;
    }
    if (specialChance.ids.includes(selectedPersonHandshake.id)) {
      value += 2;
    }
  }

  return value;
}
async function mHandlePlayAudio(
  mood = { ...PersonMood.NORMAL, imageIndex: 0, audioIndex: 0 },
  personAudio = new PersonAudio(),
  result = PlayerAchievementMethods.Result
) {
  const soundTimesPlayed = globalState.personMoodSoundCount[mood.name].timesPlayed;
  const hasJustPlayed = globalState.personMoodSoundCount[mood.name].hasJustPlayed;
  if ((soundTimesPlayed >= MaxTimesSoundPlayed || hasJustPlayed) && globalState.timesPlayed < MaxTimesPlayed && !result.showAchievement) {
    globalState.setPersonMoodSoundCount((prev) => {
      return { ...prev, [mood.name]: { timesPlayed: soundTimesPlayed, hasJustPlayed: false } };
    });
    return;
  }
  const sound = await playAudio(personAudio[mood.name], true, mood.audioIndex);
  let timeout;
  if (sound) {
    if (timeout) clearTimeout(timeout);
    globalState.setIsPersonSoundPlaying(true);
    globalState.setPersonMoodSoundCount((prev) => {
      return { ...prev, [mood.name]: { timesPlayed: prev[mood.name].timesPlayed + 1, hasJustPlayed: true } };
    });
  }
  sound?.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && (status.durationMillis === status.positionMillis || status.didJustFinish)) {
      timeout = setTimeout(() => {
        globalState.setIsPersonSoundPlaying((prev) => false);
        clearTimeout(timeout);
      }, 500);

      sound.unloadAsync();
    }
  });
  if (globalState.isPersonSoundPlaying && globalState.personHadEnough) {
    const cautionTimeout = setTimeout(() => {
      globalState.setIsPersonSoundPlaying((prev) => false);
      clearTimeout(cautionTimeout);
    }, 7000);
  }
}
function getMoodBasedOnHandshake() {
  let hasHandshakeMatched = globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id;
  let oldMoodValue = globalState.personMood.value;
  let person = globalState.person;

  let mood = PersonMood.NORMAL;
  let imageIndex = 0;
  let audioIndex = 0;

  if (globalState.isFirstEncounterEver === true || globalState.achievementResult.showAchievement === true) {
    mood = PersonMood.HAPPY;
  } else if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id) {
    mood = PersonMood.SIGNATURE;
  } else if (hasHandshakeMatched && oldMoodValue === PersonMood.ANGRY.value) {
    mood = PersonMood.NORMAL;
  } else if (hasHandshakeMatched && [PersonMood.NORMAL.value, PersonMood.HAPPY.value, PersonMood.SIGNATURE.value].includes(oldMoodValue)) {
    mood = PersonMood.HAPPY;
  } else if (!hasHandshakeMatched && [PersonMood.ANGRY.value, PersonMood.NORMAL.value, PersonMood.SIGNATURE.value].includes(oldMoodValue)) {
    mood = PersonMood.ANGRY;
  } else if (!hasHandshakeMatched && oldMoodValue === PersonMood.HAPPY.value) {
    mood = PersonMood.NORMAL;
  } else {
    mood = PersonMood.NORMAL;
  }
  let imageLength = person.images[mood.name]().length;
  let audioLength = person.audio[mood.name]().length;
  imageIndex =
    oldMoodValue == mood.value ? getRandomNumber(imageLength, 0, imageLength > 1 ? globalState.personMood.imageIndex : -1) : imageIndex;
  audioIndex =
    oldMoodValue == mood.value ? getRandomNumber(audioLength, 0, audioLength > 1 ? globalState.personMood.audioIndex : -1) : audioIndex;

  return { ...mood, imageIndex, audioIndex };
}
//#endregion

//#region (m) Mutative Functions
function mUpdateMeterValue(addedValue = 0) {
  let value = addedValue;
  if (globalState.isFirstEncounterEver && globalState.hasShakeEnded) {
    value = globalState.person.moodBreakpoints.NORMAL + 1;
  } else if (
    !globalState.isFirstEncounterEver &&
    globalState.hasShakeEnded &&
    globalState.meter.meterValue == globalState.person.moodBreakpoints.DEFAULT
  ) {
    if (globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id) {
      value = globalState.person.moodBreakpoints.NORMAL + 1;
    }
    if (globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id) {
      value = globalState.person.moodBreakpoints.ANGRY - 1;
    }
  }

  globalState.dispatch(meterUpdate({ personId: globalState.person.id, meterValue: value }));
}
function mShakeEndedTimeout(result = PlayerAchievementMethods.Result) {
  let finishMsgTimeout;
  let increaseTimesPlayedNum = globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id ? 2 : 1;
  globalState.setTimesPlayed((prev) => prev + increaseTimesPlayedNum);
  if (
    result.showAchievement ||
    globalState.isFirstEncounterEver ||
    globalState.timesPlayed + increaseTimesPlayedNum >= MaxTimesPlayed ||
    globalState.gameType === GameType.QUICK
  ) {
    globalState.setPersonHadEnough((prev) => true);
    finishMsgTimeout = setTimeout(
      () => {
        if (result.showAchievement) globalState.setGifVisible((prev) => true);
        globalState.showModal();
      },
      globalState.isFirstEncounterEver ? FinishMsgTimeout : FinishMsgTimeout / 2
    );
  }
  return finishMsgTimeout;
}
//#endregion

//#region Public methods
export function generateRandomHandshake({ person = new Person() }) {
  let randChance = getRandomNumber(person.chanceRange.max);
  let randIndex = 0;
  let handShakeId = 1;
  let handShake = handshakes[0];
  const { specialChance, highChance, lowChance, medChance } = person.handshakesOccurance;
  if (specialChance.ids.length > 0 && randChance <= specialChance.value) {
    handShake = getHandshake(specialChance.ids);
  } else if (lowChance.ids.length > 0 && randChance <= lowChance.value) {
    handShake = getHandshake(lowChance.ids);
  } else if (medChance.ids.length > 0 && randChance <= medChance.value) {
    handShake = getHandshake(medChance.ids);
  } else if (highChance.ids.length > 0 && randChance <= highChance.value) {
    handShake = getHandshake(highChance.ids);
  }
  return handShake || new Handshake();
}
export function handleShakeEnded() {
  if (globalState.hasShakeEnded == false) return;
  let newMood = getMoodBasedOnHandshake();
  globalState.setPersonMood((prev) => ({
    name: newMood.name,
    value: newMood.value,
    imageIndex: newMood.imageIndex,
    audioIndex: newMood.audioIndex,
  }));
  let meterAddedValue = generateMoodValue({ ...globalState });
  let result = PlayerAchievementMethods.Result;
  let param = PlayerAchievementMethods.Param;
  param.meterAddedValue = meterAddedValue;
  param.newMood = newMood;
  result = mHandlePlayerAchievements(param);
  globalState.setAchievementResult((prev) => result);
  mHandlePlayAudio(newMood, globalState.person.audio, result);
  meterAddedValue += result.showAchievement ? 4 : 0;
  mUpdateMeterValue(meterAddedValue);
  return mShakeEndedTimeout(result);
}
export function mShakeAgain() {
  //globalState.setSelectedPersonHandshake(handshakes[getRandomNumber(handshakes.length)]);
  globalState.setSelectedPersonHandshake((prev) => generateRandomHandshake({ person: globalState.person }) || new Handshake());
  globalState.setHasPlayStarted((prev) => true);
  globalState.setTimer((prev) => TimerStartValue);
  globalState.setHasShakeEnded((prev) => false);
  globalState.setHasShakeStarted((prev) => false);
  globalState.setHasPressedShake(false);
}
export function leaveScreen(e, screenName = ScreenNames.PersonsScreen) {
  globalState.navigation.reset({
    index: 0,
    routes: [
      {
        name: ScreenNames.HomeScreen,
        state: {
          routes: [{ name: screenName, params: { personId: globalState.person.id, methodName: globalState.achievementResult.methodName } }],
        },
      },
    ],
  });
}
//#endregion
