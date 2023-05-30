import { useEffect, useState } from "react";
import handshakes from "../../data/Handshake";
import { Handshake } from "../../models/Handshake";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { globalState } from "../../global/GameScreen";
import { HandshakeDuration, TimerIntervalValue, TimerStartValue } from "../../constants/GameScreen";

export default useTimer = () => {
  const [timer, setTimer] = useState(TimerStartValue);
  const [timerInterval, setTimerInterval] = useState(null); //So When Timer Stops, I Clear Interval
  useEffect(() => {
    if (globalState.hasPlayStarted !== true || globalState.showWalkthrough !== false) return;
    const interval = setInterval(() => {
      setTimer((count) => {
        return count - TimerIntervalValue / 1000; //must use () => bcz it will get stuck at 7, won't add bcz its inside an interval, (common problem with (stale closures (useMemo, useEffect,etc...) or async) inside useeffect and setState)
      });
      globalState.setSelectedPersonHandshake((prev) => handshakes[getRandomNumber(handshakes.length, 0, prev)] || new Handshake());
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
  }, [timer]);
  return [timer, setTimer];
};
