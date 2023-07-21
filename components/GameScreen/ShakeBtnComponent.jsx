import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalState } from "../../global/GameScreen";

const ShakeBtnComponent = () => {
  const beginHandshake = () => {
    // globalState.setSelectedPersonHandshake(
    //   (prev) => handshakes[getRandomNumber(handshakes.length, 0, prev)] || new Handshake()
    //   // handshakes[0] || new Handshake()
    // );
    if (globalState.showWalkthrough === true) {
      return;
    }
    globalState.setTimer((prev) => 0);
    globalState.personHandshakeAnimation.values.opacity.stopAnimation(); //(opacity, positionY, etc... just one will stop all (bcz parallel))
    globalState.playerHandshakeAnimation.values.opacity.stopAnimation();
    // globalState.personHandshakeAnimation.values.positionX.stopAnimation();
    // globalState.playerHandshakeAnimation.values.positionX.stopAnimation();
    // globalState.playerHandshakeAnimation.values.positionY.stopAnimation();
    // globalState.playerHandshakeAnimation.values.positionY.stopAnimation();
  };
  return (
    <View className="w-full items-center mt-7 border">
      <TouchableOpacity
        // className="bg-yellow-500 px-14 py-4 rounded-sm"
        className="bg-yellow-500 w-full h-16 rounded-md flex-row items-center justify-center space-x-4"
        style={{ opacity: globalState.hasShakeStarted === true && 0.4 }}
        disabled={globalState.hasShakeStarted === true}
        onPress={beginHandshake}
      >
        {/* <Text className="text-lg text-black-500">Shake!</Text> */}
        <Text className="text-black-700 text-lg text-center font-bold">Shake</Text>
        <Text className="text-xl text-center">🤝</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShakeBtnComponent;
