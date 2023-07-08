//#region constants
export const TimerStartValue = 7;
export const TimerIntervalValue = 1000;
export const HandshakeDuration = 750;
export const HandshakeSpaceX = 120;
export const HandshakeSpaceY2 = 20;
export const playerHandshakeAnimationValues = {
  duration: TimerStartValue * 1000,
  y1: 70,
  y2: HandshakeSpaceY2,
  x2: -HandshakeSpaceX / 2,
};
export const personHandshakeAnimationValues = {
  duration: TimerStartValue * 1000,
  y1: -50,
  y2: -HandshakeSpaceY2,
  x2: HandshakeSpaceX / 2,
};
export const FinishMsgTimeout = 2000;
export const MaxTimesPlayed = 12;
//#endregion

//#region Enums
export const GameType = {
  NORMAL: 1,
  QUICK: 2,
};
//#endregion
