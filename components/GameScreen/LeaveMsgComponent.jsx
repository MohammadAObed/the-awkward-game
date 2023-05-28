import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalState } from "../../global/GameScreen";

const LeaveMsgComponent = ({ leaveScreen = function () {} }) => {
  const msg = `${globalState.person.name} ${
    globalState.personHadEnough && globalState.timesPlayed === 1 ? `enjoyed that!, you can contact with him later` : `got bored! bye bye`
  }`;
  return (
    <View className="mt-52 flex items-center">
      <Text className="text-white w-72 text-center text-lg">{msg}</Text>
      <TouchableOpacity className="bg-yellow-500 py-2 px-9 rounded-md mt-2" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center">Leave!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LeaveMsgComponent;
