import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { globalState, nGlobalState } from "../../global/GameScreen";
import { playAudio } from "../../utils/common/playAudio";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { useSelector } from "react-redux";
import { selectSettingsByName } from "../../features/SettingsSlice";
import { Setting, SettingsNames } from "../../models/Setting";

const GifComponent = ({ leaveScreen = function () {} }) => {
  const soundRef = useRef(null);
  const fireworksRef = useRef(null);
  let settingsModel = new Setting();
  settingsModel = useSelector((state) => selectSettingsByName(state, SettingsNames.AiVoice));
  useEffect(() => {
    async function loadSound() {
      try {
        const audioArr = [
          require("../../assets/audio/aiadam/hurraaaay.mp3"),
          require("../../assets/audio/aiadam/hurrayBuddy.mp3"),
          require("../../assets/audio/aiadam/congrats.mp3"),
        ];
        const fireworksSound = await playAudio(
          () => require("../../assets/audio/fireworksShort.mp3"),
          true,
          getRandomNumber(audioArr.length),
          true
        );
        const newSound = settingsModel.value !== true ? null : await playAudio(() => audioArr, true, getRandomNumber(audioArr.length));
        soundRef.current = newSound;
        fireworksRef.current = fireworksSound;
      } catch (error) {
        console.log("Error loading audio:", error);
      }
    }
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (fireworksRef.current) {
        fireworksRef.current.unloadAsync();
      }
    };
  }, []);
  return (
    <View className=" flex items-center">
      <Image className="w-60 h-60" source={globalState.achievementResult?.requireImage()} />
      <Text className="mt-5 text-white w-72 text-center text-lg">{globalState.achievementResult.msg}</Text>
      <TouchableOpacity className="bg-yellow-500 py-3 px-16 rounded-md mt-5" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center">Achievement 👉</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GifComponent;
