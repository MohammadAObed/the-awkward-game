import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { globalState } from "../../global/GameScreen";
import { GameType } from "../../constants/GameScreen";
import { playAudio } from "../../utils/common/playAudio";
import { getRandomNumber } from "../../utils/common/getRandomNumber";

const LeaveMsgComponent = ({ leaveScreen = function () {} }) => {
  const [msg, setMsg] = useState("");
  const [sound, setSound] = useState(null);
  useEffect(() => {
    if (globalState.isPersonSoundPlaying) {
      return;
    }
    async function determineAudioAndMessage() {
      let newMsg = `${globalState.person.name} `;
      let newSound = null;
      try {
        if (globalState.isFirstEncounterEver && globalState.personHadEnough) {
          newMsg = `He Enjoyed that!, you can contact with him later...`;
          newSound = await playAudio(() => require("../../assets/audio/aiadam/EnjoyedThat.mp3"), true, -1, false, true);
        } else if (globalState.gameType == GameType.QUICK && globalState.personHadEnough) {
          let msgArr = [`He Was just passing by and left...`, `He just wanted to say hi...`];
          let audioArr = [
            () => require("../../assets/audio/aiadam/wasJustPassingBy.mp3"),
            () => require("../../assets/audio/aiadam/heJustWanted.mp3"),
          ];
          let randNum = getRandomNumber(msgArr.length);
          newMsg = msgArr[randNum];
          newSound = await playAudio(audioArr[randNum], true, -1, false, true);
        } else {
          let msgArr = [`Got bored! bye bye...`, `He had enough...`];
          let audioArr = [
            () => require("../../assets/audio/aiadam/gotBoredBye.mp3"),
            () => require("../../assets/audio/aiadam/heHadEnough.mp3"),
          ];
          let randNum = getRandomNumber(msgArr.length);
          newMsg = msgArr[randNum];
          newSound = await playAudio(audioArr[randNum], true, -1, false, true);
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
  }, [globalState.isPersonSoundPlaying]);
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
