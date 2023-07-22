import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalState } from "../../global/GameScreen";
import { GameType } from "../../constants/GameScreen";

const LeaveMsgComponent = ({ leaveScreen = function () {} }) => {
  const msg = `${globalState.person.name} ${
    globalState.isFirstEncounterEver && globalState.personHadEnough
      ? `enjoyed that!, you can contact with him later...`
      : globalState.gameType == GameType.QUICK && globalState.personHadEnough
      ? `was just passing by and left...`
      : `got bored! bye bye...`
  }`;
  return (
    <View className="mt-52 flex items-center">
      <Text className="text-white w-72 text-center text-lg">{msg}</Text>
      <TouchableOpacity className="bg-yellow-500 py-3 px-16 rounded-md mt-2" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center text-lg">Leave 👋</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LeaveMsgComponent;
