import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { BtnSounds } from "../../constants/BtnSound";

const useButtonAudio = (soundEnum = BtnSounds.CommonSound) => {
  const [sound, setSound] = useState();

  async function playSound() {
    await sound?.replayAsync();
  }

  async function loadSound() {
    if (soundEnum == BtnSounds.CommonSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/audio/buttonClickJumpSound.mp3"), { shouldPlay: false });
      setSound(sound);
    } else if (soundEnum == BtnSounds.StartScreenSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/audio/persons/RockSign.mp3"), { shouldPlay: false });
      setSound(sound);
    }
  }

  useEffect(() => {
    loadSound();
  }, []);

  return { playSound };
};

export default useButtonAudio;
