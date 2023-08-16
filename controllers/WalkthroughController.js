export function WalkthroughUpdate(state, action) {
  let walkthroughUpdated = state.walkthroughes.map((w) => {
    if (w.screenName == action.payload.screenName && w.listOrder == action.payload.listOrder) {
      w.show = action.payload.show;
    }
    return w;
  });
  state.walkthroughes = [...walkthroughUpdated];
}

export function WalkthroughReset(state, action, initialState) {
  state.walkthroughes = initialState.walkthroughes;
}
