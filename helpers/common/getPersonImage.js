import { Person } from "../../models/Person";
import { getRandomNumber } from "../../utils/common/getRandomNumber";

export function getPersonImage(meterValue, person = new Person()) {
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
  let image = null;

  if (isFirstEncounterEver === true || showAchievment === true) {
    image = person.images.Happy;
  } else if (hasHandshakeMatched && oldImage === person.images.Angry) {
    image = generateRandomNormalImg(image, person);
  } else if (hasHandshakeMatched && person.images.Normal.includes(oldImage)) {
    image = person.images.Happy;
  } else if (hasHandshakeMatched && oldImage === person.images.Happy) {
    image = person.images.Happy;
  } else if (!hasHandshakeMatched && oldImage === person.images.Angry) {
    image = person.images.Angry;
  } else if (!hasHandshakeMatched && person.images.Normal.includes(oldImage)) {
    image = person.images.Angry;
  } else if (!hasHandshakeMatched && oldImage === person.images.Happy) {
    image = generateRandomNormalImg(image, person);
  } else {
    image = generateRandomNormalImg(image, person);
  }

  return { newPersonImage: image };
}

export function getInitialImage(meterValue, person = new Person()) {
  let image = null;
  if (meterValue == person.moodBreakpoints.DEFAULT) {
    image = generateRandomNormalImg(image, person);
  } else if (meterValue <= person.moodBreakpoints.ANGRY) {
    image = person.images.Angry;
  } else if (meterValue <= person.moodBreakpoints.NORMAL) {
    image = generateRandomNormalImg(image, person);
  } else if (meterValue <= person.moodBreakpoints.HAPPY) {
    image = person.images.Happy;
  } else {
    image = generateRandomNormalImg(image, person);
  }
  return image;
}

function generateRandomNormalImg(image, person = new Person()) {
  let randNormalImgIndex = getRandomNumber(2);
  return person.images.Normal[randNormalImgIndex];
}
