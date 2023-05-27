import { View, Text, Animated } from "react-native";
import React from "react";
import { PlayerType } from "../../constants/PlayerType";
import { Handshake } from "../../models/Handshake";
import { HandshakeSpaceX } from "../../constants/QuickGameRoundScreen";
import { globalState } from "../../global/QuickGameRoundScreen";

const MovingHandshakeComponent = ({ playerType = PlayerType.PLAYER }) => {
  const selectedHandshake = playerType === PlayerType.PLAYER ? globalState.selectedHandshake : globalState.selectedPersonHandshake;
  const handshakeRotation = playerType === PlayerType.PLAYER ? selectedHandshake.rotation : selectedHandshake.personRotation;
  const handshakeAnimationValues =
    playerType === PlayerType.PLAYER ? globalState.playerHandshakeAnimation.values : globalState.personHandshakeAnimation.values;
  const { positionY, positionX, opacity } = handshakeAnimationValues;

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
      <View>
        <Text className="text-4xl" style={{ transform: [{ rotate: `${handshakeRotation}deg` }] }}>
          {selectedHandshake.symbol}
        </Text>
      </View>
    </Animated.View>
  );
};
export default MovingHandshakeComponent;
