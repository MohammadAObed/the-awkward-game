import { FinishMsgTimeout, GameType, MaxTimesPlayed, TimerStartValue } from "../constants/GameScreen";
import { ScreenNames } from "../constants/ScreenNames";
import handshakes from "../data/Handshake";
import { meterUpdate } from "../features/PersonMeterSlice";
import { playerAchievementUpdate } from "../features/PlayerAchievementSlice";
import { globalState } from "../global/GameScreen";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import { PlayerAchievement, PlayerAchievementMethods } from "../models/PlayerAchievement";
import { getRandomNumber } from "../utils/common/getRandomNumber";

//? Look for export keyword to know which functions are used outside

//#region private
function mHandlePlayerAchievements(param = PlayerAchievementMethods.Param) {
  let result = PlayerAchievementMethods.Result;
  for (const playerAchievement of param.playerPersonAchievementList) {
    if (playerAchievement.hasUnlocked) continue;
    param.playerPersonAchievement = playerAchievement;
    result = checkAchievement(param);
    if (result.showAchievement === true) {
      globalState.dispatch(playerAchievementUpdate({ id: playerAchievement.id, hasUnlocked: true }));
      console.log("🚀 ~ file: GameScreen.js:24 ~ mHandlePlayerAchievements ~ playerAchievement:", playerAchievement);
      return result;
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
    }
    if (specialChance.ids.includes(selectedPersonHandshake.id)) {
      //do special stuff
    }
  } else {
    value -= 1;
    if (selectedPersonHandshake.id === person.signatureHandshake.id) {
      value -= 2;
    }
    if (specialChance.ids.includes(selectedPersonHandshake.id)) {
      //do special stuff
    }
  }

  return value;
}
//#endregion

//#region (m) Mutative Functions
function mUpdateMoodValue(achievementValue = 0) {
  let value = achievementValue;
  value += generateMoodValue({ ...globalState });
  if (globalState.isFirstTime && globalState.hasShakeEnded) {
    value = globalState.person.moodBreakpoints.NORMAL + 1;
  } else if (
    !globalState.isFirstTime &&
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
  globalState.setTimesPlayed((prev) => prev + 1);
  if (
    result.showAchievement ||
    globalState.isFirstTime ||
    globalState.timesPlayed >= MaxTimesPlayed ||
    globalState.gameType === GameType.QUICK
  ) {
    globalState.setPersonHadEnough((prev) => true);
    finishMsgTimeout = setTimeout(
      () => {
        if (result.showAchievement) globalState.setGifVisible((prev) => true);
        globalState.showModal();
      },
      globalState.isFirstTime ? FinishMsgTimeout : FinishMsgTimeout / 2
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
  } else if (randChance <= lowChance.value) {
    handShake = getHandshake(lowChance.ids);
  } else if (randChance <= medChance.value) {
    handShake = getHandshake(medChance.ids);
  } else if (randChance <= highChance.value) {
    handShake = getHandshake(highChance.ids);
  }
  return handShake || new Handshake();
}
export function handleShakeEnded() {
  if (globalState.hasShakeEnded == false) return;
  let result = PlayerAchievementMethods.Result;
  result = mHandlePlayerAchievements({ ...globalState });
  globalState.setAchievementResult((prev) => result);
  mUpdateMoodValue(result.showAchievement ? 5 : 0);
  return mShakeEndedTimeout(result);
}
export function mShakeAgain() {
  globalState.setSelectedPersonHandshake(handshakes[getRandomNumber(handshakes.length)]);
  globalState.setHasPlayStarted(true);
  globalState.setTimer(TimerStartValue);
  globalState.setHasShakeEnded(false);
  globalState.setHasShakeStarted(false);
}
export function leaveScreen(screenName = ScreenNames.PersonsScreen) {
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
