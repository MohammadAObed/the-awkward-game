export function WalkthroughUpdate(state, action) {
  console.log("action", action.payload);
  console.log("state", state.walkthroughes);
  let walkthroughUpdated = state.walkthroughes.map((w) => {
    if (w.screenName == action.payload.screenName && w.listOrder == action.payload.listOrder) {
      w.show = action.payload.show;
    }
    return w;
  });
  state.walkthroughes = [...walkthroughUpdated];
}
