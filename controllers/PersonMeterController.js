export function MeterUpdate(state, action) {
  const { meterValue, personId } = action.payload;
  if (meterValue == 0) return;
  let metersUpdated = state.meters.map((m) => {
    if (m.personId !== personId) return m;
    if (m.meterValue + meterValue <= 0) return m;
    m.meterValue += meterValue;
    return m;
  });

  state.meters = [...metersUpdated];
}

export function MeterReset(state, action, initialState) {
  state.meters = initialState.meters;
}
