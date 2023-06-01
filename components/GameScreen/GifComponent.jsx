import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GifComponent = ({ leaveScreen = function () {} }) => {
  const msg = "";
  return (
    <View className="mt-52 flex items-center">
      <Text className="text-white w-72 text-center text-lg">{msg}</Text>
      <TouchableOpacity className="bg-yellow-500 py-2 px-9 rounded-md mt-2" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center">Achievement 👉</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GifComponent;
