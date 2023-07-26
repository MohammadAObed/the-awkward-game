import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { globalState } from "../../global/GameScreen";
import { GameType } from "../../constants/GameScreen";
import { playAudio } from "../../utils/common/playAudio";

const LeaveMsgComponent = ({ leaveScreen = function () {} }) => {
  const [msg, setMsg] = useState(`${globalState.person.name} `);
  const [sound, setSound] = useState(null);
  useEffect(() => {
    async function determineAudioAndMessage() {
      let newMsg = "";
      let newSound = null;
      try {
        if (globalState.isFirstEncounterEver && globalState.personHadEnough) {
          newMsg = `enjoyed that!, you can contact with him later...`;
          newSound = await playAudio(() => require("../../assets/audio/aiadam/EnjoyedThat.mp3"));
        } else if (globalState.gameType == GameType.QUICK && globalState.personHadEnough) {
          newMsg = `was just passing by and left...`;
          newSound = await playAudio(() => require("../../assets/audio/aiadam/wasJustPassingBy.mp3"));
        } else {
          newMsg = `got bored! bye bye...`;
          newSound = await playAudio(() => require("../../assets/audio/aiadam/gotBoredBye.mp3"));
        }
        setSound(newSound);
        setMsg((prev) => prev + newMsg);
      } catch (error) {
        console.log("Error playing audio:", error);
      }
    }

    determineAudioAndMessage();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  return (
    <View className="mt-52 flex items-center">
      <Text className="text-white w-72 text-center text-lg">{msg}</Text>
      <TouchableOpacity
        className="bg-yellow-500 py-3 px-16 rounded-md mt-2"
        onPress={(e) => {
          sound?.stopAsync();
          sound?.unloadAsync();
          leaveScreen(e);
        }}
      >
        <Text className=" text-black-500 text-center text-lg">Leave 👋</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LeaveMsgComponent;
