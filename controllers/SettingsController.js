export function SettingsUpdate(state, action) {
  let settingsUpdated = state.settings.map((s) => {
    if (s.id !== action.payload.id) return s;
    s.value = action.payload.value;
    return s;
  });
  state.settings = [...settingsUpdated];
}

export function SettingstReset(state, action, initialState) {
  state.settings = initialState.settings;
}
