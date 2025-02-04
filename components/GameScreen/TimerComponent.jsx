import React from "react";
import { Text, View } from "react-native";
import { globalState, nGlobalState } from "../../global/GameScreen";
import useGlobalState from "../../hooks/common/useGlobalState";
import useTimer from "../../hooks/GameScreen/useTimer";

const TimerComponent = () => {
  useGlobalState(globalState, useTimer, [], nGlobalState.timer, nGlobalState.setTimer);

  return (
    <View className="w-14 h-14 bg-[#eb1f1f] justify-center items-center flex rounded-full">
      <Text className="text-xl text-black-500 font-bold">{globalState.timer}</Text>
    </View>
  );
};

export default TimerComponent;
