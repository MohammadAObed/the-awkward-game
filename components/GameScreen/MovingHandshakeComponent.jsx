import { View, Text, Animated } from "react-native";
import React from "react";
import { PlayerType } from "../../constants/PlayerType";
import { Handshake } from "../../models/Handshake";
import { HandshakeSpaceX } from "../../constants/GameScreen";
import { globalState } from "../../global/GameScreen";

const MovingHandshakeComponent = ({ playerType = PlayerType.PLAYER }) => {
  const selectedPlayerHandshake = playerType === PlayerType.PLAYER ? globalState.selectedPlayerHandshake : globalState.selectedPersonHandshake;
  const handshakeRotation = playerType === PlayerType.PLAYER ? selectedPlayerHandshake.rotation : selectedPlayerHandshake.personRotation;
  const handshakeAnimationValues =
    playerType === PlayerType.PLAYER ? globalState.playerHandshakeAnimation.values : globalState.personHandshakeAnimation.values;
  const { positionY, positionX, opacity } = handshakeAnimationValues;
  const splittedSymbol = selectedPlayerHandshake.symbol.split(" ");
  return (
    <Animated.View
      style={{
        transform: [{ translateY: positionY }, { translateX: positionX }],
        opacity,
        marginLeft: playerType === PlayerType.PLAYER ? HandshakeSpaceX : 0,
        marginRight: playerType === PlayerType.PERSON ? HandshakeSpaceX : 0,
        position: playerType === PlayerType.PLAYER ? "absolute" : "relative",
        zIndex: 0,
      }}
    >
      <View className="flex-row">
        {splittedSymbol.map((s, index) => (
          <Text key={index} className="text-4xl" style={{ transform: [{ rotate: `${handshakeRotation}deg` }] }}>
            {s}
          </Text>
        ))}
      </View>
    </Animated.View>
  );
};
export default MovingHandshakeComponent;
