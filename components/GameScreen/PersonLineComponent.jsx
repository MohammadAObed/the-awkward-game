import { View, Text } from "react-native";
import React from "react";
import { globalState } from "../../global/GameScreen";

const PersonLineComponent = () => {
  return (
    <View className="h-fit mb-6 space-y-2 flex items-center bg-black-600 p-5 pt-7">
      <Text className="text-xl text-white text-center">
        {globalState.person.name}:
        {globalState.selectedPlayerHandshake.id !== globalState.selectedPersonHandshake.id
          ? ` Haha, that was awkward! don't worry about it, `
          : ` Nice grip you got there! `}
      </Text>
      <Text className="text-center text-xl text-yellow-500">{globalState.person.signatureLine}!</Text>
    </View>
  );
};

export default PersonLineComponent;
