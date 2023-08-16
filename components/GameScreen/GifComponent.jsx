import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { globalState } from "../../global/GameScreen";
import { playAudio } from "../../utils/common/playAudio";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { useSelector } from "react-redux";
import { selectSettingsByName } from "../../features/SettingsSlice";
import { Setting, SettingsNames } from "../../models/Setting";
import { PlayerAchievementMethods } from "../../models/PlayerAchievementMethods";

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
        const fireworksSound = await playAudio(() => require("../../assets/audio/fireworksShort.mp3"), true, -1, true);
        const newSound = settingsModel.value !== true ? null : await playAudio(() => audioArr, true, getRandomNumber(audioArr.length));
        soundRef.current = newSound;
        fireworksRef.current = fireworksSound;
      } catch (error) {
        //console.log("Error loading audio:", error);
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
  var lines = globalState.achievementResult.msg.split(PlayerAchievementMethods.MultiLineSepeartor);
  return (
    <View className=" flex items-center">
      <Image className="w-60 h-60" source={globalState.achievementResult?.requireImage()} />
      {lines.length > 1 ? (
        <>
          <Text className="mt-5 text-yellow-500 w-72 text-center text-lg">{lines[0]}</Text>
          <Text className="mt-2 text-white w-72 text-center text-lg">{lines[1]}</Text>
        </>
      ) : (
        <Text className="mt-5 text-white w-72 text-center text-lg">{lines.length == 1 ? lines[0] : ""}</Text>
      )}
      <TouchableOpacity className="bg-yellow-500 py-3 px-16 rounded-md mt-5" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center">Achievement 👉</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GifComponent;
