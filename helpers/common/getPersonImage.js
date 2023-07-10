import { Person } from "../../models/Person";

export function getPersonImage(meterValue, person = new Person()) {
  let image =
    meterValue == person.moodBreakpoints.DEFAULT
      ? person.images.Normal
      : meterValue <= person.moodBreakpoints.ANGRY
      ? person.images.Angry
      : meterValue <= person.moodBreakpoints.NORMAL
      ? person.images.Normal
      : meterValue <= person.moodBreakpoints.HAPPY
      ? person.images.Happy
      : person.images.Normal;

  return image;
}

export function getImageBasedOnHandshake(
  meterValue,
  person = new Person(),
  hasHandshakeMatched = false,
  isFirstEncounterEver = false,
  showAchievment = false
) {
  if (meterValue == person.moodBreakpoints.DEFAULT) {
    image = person.images.Normal;
  } else if (isFirstEncounterEver === true || showAchievment === true) {
    image = person.images.Happy;
  } else if (hasHandshakeMatched && meterValue <= person.moodBreakpoints.ANGRY) {
    image = person.images.Normal;
  } else if (hasHandshakeMatched && meterValue <= person.moodBreakpoints.HAPPY) {
    image = person.images.Happy;
  } else if (!hasHandshakeMatched && meterValue <= person.moodBreakpoints.ANGRY) {
    image = person.images.Angry;
  } else if (!hasHandshakeMatched && meterValue <= person.moodBreakpoints.HAPPY) {
    image = person.images.Normal;
  } else {
    image = person.images.Normal;
  }
  return image;
}
