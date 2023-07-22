import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { globalState, nGlobalState } from "../../global/GameScreen";
import useGlobalState from "../../hooks/common/useGlobalState";
import { initialState } from "../../initials/GameScreen";

const GifComponent = ({ leaveScreen = function () {} }) => {
  return (
    <View className=" flex items-center">
      <Image className="w-64 h-60" source={globalState.achievementResult.image} />
      <Text className="mt-5 text-white w-72 text-center text-lg">{globalState.achievementResult.msg}</Text>
      <TouchableOpacity className="bg-yellow-500 py-3 px-16 rounded-md mt-5" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center">Achievement 👉</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GifComponent;
