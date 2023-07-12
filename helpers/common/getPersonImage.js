import { Person } from "../../models/Person";
import { getRandomNumber } from "../../utils/common/getRandomNumber";

export function getPersonImage(meterValue, person = new Person()) {
  //let randNormalImgIndex = getRandomNumber(2);
  let image =
    meterValue == person.moodBreakpoints.DEFAULT
      ? person.images.Normal[0]
      : meterValue <= person.moodBreakpoints.ANGRY
      ? person.images.Angry
      : meterValue <= person.moodBreakpoints.NORMAL
      ? person.images.Normal[0]
      : meterValue <= person.moodBreakpoints.HAPPY
      ? person.images.Happy
      : person.images.Normal[0];

  return image;
}

export function getImageBasedOnHandshake(
  meterValue,
  person = new Person(),
  hasHandshakeMatched = false,
  isFirstEncounterEver = false,
  showAchievment = false,
  oldImage = null
) {
  let randNormalImgIndex = getRandomNumber(2);
  if (meterValue == person.moodBreakpoints.DEFAULT) {
    image = person.images.Normal[randNormalImgIndex];
  } else if (isFirstEncounterEver === true || showAchievment === true) {
    image = person.images.Happy;
  } else if (hasHandshakeMatched && meterValue <= person.moodBreakpoints.ANGRY) {
    image = person.images.Normal[randNormalImgIndex];
  } else if (hasHandshakeMatched && meterValue <= person.moodBreakpoints.HAPPY) {
    image = person.images.Happy;
  } else if (!hasHandshakeMatched && meterValue <= person.moodBreakpoints.ANGRY) {
    image = person.images.Angry;
  } else if (!hasHandshakeMatched && meterValue <= person.moodBreakpoints.HAPPY) {
    image = person.images.Normal[randNormalImgIndex];
  } else {
    image = person.images.Normal[randNormalImgIndex];
  }
  while (oldImage === image) {
    randNormalImgIndex = getRandomNumber(2);
    image = person.images.Normal[randNormalImgIndex];
  }
  return image;
}
