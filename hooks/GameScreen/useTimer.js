import { useEffect, useState } from "react";
import handshakes from "../../data/Handshake";
import { Handshake } from "../../models/Handshake";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { globalState } from "../../global/GameScreen";
import { HandshakeDuration, TimerIntervalValue, TimerStartValue } from "../../constants/GameScreen";
import { generateRandomHandshake } from "../../helpers/GameScreen";

export default useTimer = () => {
  const [timer, setTimer] = useState(TimerStartValue);
  const [timerInterval, setTimerInterval] = useState(null); //So When Timer Stops, I Clear Interval
  useEffect(() => {
    if (globalState.hasPlayStarted !== true || globalState.showWalkthrough !== false) return;
    const interval = setInterval(() => {
      setTimer((count) => {
        return count - TimerIntervalValue / 1000; //must use () => bcz it will get stuck at 7, won't add bcz its inside an interval, (common problem with (stale closures (useMemo, useEffect,etc...) or async) inside useeffect and setState)
      });
      globalState.setSelectedPersonHandshake((prev) => generateRandomHandshake({ person: globalState.person }) || new Handshake());
      //globalState.setSelectedPersonHandshake((prev) => globalState.person.signatureHandshake);
      //globalState.setSelectedPersonHandshake((prev) => handshakes[getRandomNumber(handshakes.length, 0, prev)] || new Handshake());
    }, TimerIntervalValue);
    setTimerInterval(interval);

    return () => {
      clearInterval(timerInterval);
      clearInterval(interval);
    };
  }, [globalState.showWalkthrough, globalState.hasPlayStarted]);

  useEffect(() => {
    if (timer > 0) return;
    clearInterval(timerInterval);
    globalState.setHasPlayStarted((prev) => false);
    globalState.setHasShakeStarted((prev) => true);
    const delayTimeout = setTimeout(() => {
      globalState.setHasShakeEnded((prev) => true);
    }, HandshakeDuration);
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [timer]);
  return [timer, setTimer];
};
