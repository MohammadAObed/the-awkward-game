import { PersonMood } from "../../constants/Person";
import { Person } from "../../models/Person";
import { getRandomNumber } from "../../utils/common/getRandomNumber";

export function getInitialMoodAndImage(meterValue, person = new Person()) {
  let mood = PersonMood.NORMAL;
  let imageIndex = 0;
  let audioIndex = 0;
  if (meterValue == person.moodBreakpoints.DEFAULT) {
    mood = PersonMood.NORMAL;
  } else if (meterValue <= person.moodBreakpoints.ANGRY) {
    mood = PersonMood.ANGRY;
  } else if (meterValue <= person.moodBreakpoints.NORMAL) {
    mood = PersonMood.NORMAL;
  } else if (meterValue <= person.moodBreakpoints.HAPPY) {
    mood = PersonMood.HAPPY;
  } else {
    mood = PersonMood.NORMAL;
  }
  let imageLength = person.images[mood.name]().length;
  imageIndex = getRandomNumber(imageLength);

  return { mood, imageIndex, audioIndex };
}
