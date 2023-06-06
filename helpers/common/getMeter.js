import { useSelector } from "react-redux";
import { PersonMeter } from "../../models/PersonMeter";
import { selectMeterByPersonId } from "../../features/PersonMeterSlice";

export function getMeterAndImage(person, isFirstTime = false) {
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, person.id));
  let meterValue = meter.meterValue;
  let image =
    meterValue == 0
      ? person.images.Normal
      : meterValue <= person.moodBreakpoints.ANGRY
      ? person.images.Angry
      : meterValue <= person.moodBreakpoints.NORMAL
      ? person.images.Normal
      : meterValue <= person.moodBreakpoints.HAPPY
      ? person.images.Happy
      : person.images.Normal;

  return { image, meter };
}
