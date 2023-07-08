import { useEffect, useRef } from "react";
import { Easing } from "react-native";
import { Animated } from "react-native";
import { globalState } from "../../global/GameScreen";
import { PlayerType } from "../../constants/PlayerType";
import { TimerStartValue } from "../../constants/GameScreen";

const animDurationAtLastMomemt = 250;

export default useAnimatedHandshake = (playerType, { duration = 7000, y1 = 0, y2 = 25, x2 = 32 }) => {
  const positionY = useRef(new Animated.Value(y1)).current;
  const positionX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    ////console.log("sssss", globalState.hasPlayStarted);
    if (globalState.hasPlayStarted !== true || globalState.showWalkthrough !== false) {
      return;
    }
    positionY.setValue(y1);
    positionX.setValue(0);
    opacity.setValue(0.6);
    ////console.log("mhmmmmm", globalState.hasPlayStarted);
    startAnimation(playerType, duration, opacity, { positionY, y1, y2 }, { positionX, x2 });
  }, [globalState.showWalkthrough, globalState.hasPlayStarted]);
  return { values: { positionY, opacity, positionX } };
};

function startAnimation(playerType, duration, opacity, { positionY, y1, y2 }, { positionX, x2 }) {
  Animated.parallel([
    Animated.timing(positionY, {
      toValue: y2,
      duration,
      useNativeDriver: true,
    }),
    Animated.timing(positionX, {
      toValue: x2 / 15,
      duration: duration,
      useNativeDriver: true,
    }),
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.3,
        duration: duration - animDurationAtLastMomemt,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.8,
        duration: animDurationAtLastMomemt,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
  ]).start((anim) => {
    if (playerType == PlayerType.PERSON) {
      x2 = x2 * globalState.selectedPersonHandshake.translateX;
    }
    if (playerType == PlayerType.PLAYER) {
      // x2 = x2 * globalState.selectedPlayerHandshake.translateX;
      y2 = y2 - globalState.selectedPlayerHandshake.translateY;
    }
    ////console.log("isAnimmmmmm", y2, x2, 1);
    // if (anim.finished === false) {
    Animated.parallel([
      Animated.timing(positionY, {
        toValue: y2,
        duration: animDurationAtLastMomemt,
        useNativeDriver: true,
      }),
      Animated.timing(positionX, {
        toValue: x2,
        duration: animDurationAtLastMomemt,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: animDurationAtLastMomemt,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
    // }
  });
}
