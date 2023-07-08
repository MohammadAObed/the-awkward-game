import persons from "../data/Person";

export function MeterUpdate(state, action) {
  const { meterValue, personId } = action.payload;
  let person = persons.find((p) => p.id == personId);
  if (meterValue == 0) return;
  let metersUpdated = state.meters.map((m) => {
    if (m.personId !== personId) return m;
    if (m.meterValue + meterValue <= person.moodBreakpoints.DEFAULT) return m;
    if (m.meterValue + meterValue > person.moodBreakpoints.HAPPY) {
      m.meterValue == 100;
      return m;
    }
    m.meterValue += meterValue;
    return m;
  });

  state.meters = [...metersUpdated];
}

export function MeterReset(state, action, initialState) {
  state.meters = initialState.meters;
}
