import { useEffect, useState } from "react";
import handshakes from "../../data/Handshake";
import { Handshake } from "../../models/Handshake";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { globalState } from "../../global/GameScreen";
import { HandshakeDuration, TimerIntervalValue, TimerStartValue } from "../../constants/GameScreen";
import { generateRandomHandshake } from "../../helpers/GameScreen";
import { playAudio } from "../../utils/common/playAudio";
import { Setting, SettingsNames } from "../../models/Setting";
import { useSelector } from "react-redux";
import { selectSettingsByName } from "../../features/SettingsSlice";

export default useTimer = () => {
  const [timer, setTimer] = useState(TimerStartValue);
  const [timerInterval, setTimerInterval] = useState(null); //So When Timer Stops, I Clear Interval
  const [countdownSound, setCountdownSound] = useState(null);
  let settingsModel = new Setting();
  settingsModel = useSelector((state) => selectSettingsByName(state, SettingsNames.timerSound));
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
    if (globalState.hasPlayStarted !== true || globalState.showWalkthrough !== false) return;
    async function playCountdownSound() {
      if (countdownSound) {
        await countdownSound.playAsync();
      }
    }
    playCountdownSound();
  }, [globalState.showWalkthrough, globalState.hasPlayStarted, countdownSound]);

  useEffect(() => {
    if (timer > 0) return;
    clearInterval(timerInterval);
    globalState.setHasPlayStarted((prev) => false);
    globalState.setHasShakeStarted((prev) => true);
    const delayTimeout = setTimeout(() => {
      globalState.setHasShakeEnded((prev) => true);
    }, HandshakeDuration);
    async function stopCountdownSound() {
      if (countdownSound) {
        await countdownSound.stopAsync();
      }
    }
    stopCountdownSound();
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [timer]);

  useEffect(() => {
    if (settingsModel.value !== true) {
      return;
    }
    async function fetchAudio() {
      const audio = await playAudio(() => require("../../assets/audio/countdown.mp3"), false, -1, true);
      await audio.setVolumeAsync(0.01);
      setCountdownSound(audio);
    }

    fetchAudio();
  }, []);

  return [timer, setTimer];
};
