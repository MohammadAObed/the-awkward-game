import handshakes from "../data/Handshake";
import { Handshake } from "../models/Handshake";
import { Person } from "../models/Person";
import { PlayerAchievement } from "../models/PlayerAchievement";
import { Param, PlayerAchievementFunctions, Result } from "./PlayerAchievementFunctions";
import { getRandomNumber } from "./common/getRandomNumber";

//#region private
function _getHandshake(ids = []) {
  var randIndex = getRandomNumber(ids.length);
  var handShakeId = ids[randIndex];
  return handshakes.find((h) => h.id === handShakeId) || new Handshake();
}
function _checkAchievement(param = Param) {
  console.log("parammmm", param.playerAchievement);
  console.log("typpppe", typeof PlayerAchievementFunctions[param.playerAchievement.methodName]);
  let result =
    typeof PlayerAchievementFunctions[param.playerAchievement.methodName] == "function"
      ? PlayerAchievementFunctions[param.playerAchievement.methodName](param)
      : Result;
  return result;
}
//#endregion

export function generateRandomHandshake({ person = new Person() }) {
  let randChance = getRandomNumber(person.chanceRange.max);
  let randIndex = 0;
  let handShakeId = 1;
  let handShake = handshakes[0];
  const { specialChance, highChance, lowChance, medChance } = person.handshakesOccurance;
  if (specialChance.ids.length > 0 && randChance <= specialChance.value) {
    handShake = _getHandshake(specialChance.ids);
  } else if (randChance <= lowChance.value) {
    handShake = _getHandshake(lowChance.ids);
  } else if (randChance <= medChance.value) {
    handShake = _getHandshake(medChance.ids);
  } else if (randChance <= highChance.value) {
    handShake = _getHandshake(highChance.ids);
  }
  return handShake || new Handshake();
}

export function generateMoodValue({
  selectedPersonHandshake = new Handshake(),
  selectedPlayerHandshake = new Handshake(),
  person = new Person(),
}) {
  let value = 0;
  const { specialChance, highChance, lowChance, medChance } = person.handshakesOccurance;
  console.log("🚀 ~ file: GameScreen.js:52 ~ selectedPlayerHandshake:", selectedPlayerHandshake);
  console.log("🚀 ~ file: GameScreen.js:52 ~ selectedPersonHandshake:", selectedPersonHandshake);

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

export function handlePlayerAchievements({
  selectedPersonHandshake = new Handshake(),
  selectedPlayerHandshake = new Handshake(),
  person = new Person(),
  playerPersonAchievements = [new PlayerAchievement()],
}) {
  let result = Result;
  for (const playerAchievement of playerPersonAchievements) {
    if (playerAchievement.hasUnlocked) continue;
    result = _checkAchievement({ selectedPersonHandshake, selectedPlayerHandshake, person, playerAchievement });
    console.log("🚀 ~ file: GameScreen.js:84 ~ result:", result);
    if (result.showAchievement === true) return result;
  }
  return result;
}
