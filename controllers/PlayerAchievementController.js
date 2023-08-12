export function PlayerAchievementUpdate(state, action) {
  let playerAchievementsUpdated = state.playerAchievements.map((m) => {
    if (m.id !== action.payload.id) return m;
    if (action.payload.extraValue !== null) {
      m.extraValue = action.payload.extraValue;
    }
    if (action.payload.hasUnlocked) {
      m.hasUnlocked = action.payload.hasUnlocked;
    }
    return m;
  });
  state.playerAchievements = [...playerAchievementsUpdated];
}

export function PlayerAchievementReset(state, action, initialState) {
  state.playerAchievements = initialState.playerAchievements;
}
