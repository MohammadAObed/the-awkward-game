import { View, Text, Image, TouchableOpacity, Button, ScrollView, Pressable, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WalkthroughProvider, WalkthroughTooltip } from "../libraries/walkthrough";
import handshakes from "../data/Handshake";
import { useDispatch } from "react-redux";
import useTimer from "../hooks/QuickGameRoundScreen/useTimer";
import useWalkthroughShow from "../hooks/QuickGameRoundScreen/useWalkthroughShow";
import useAnimatedHandshake from "../hooks/QuickGameRoundScreen/useAnimatedHandshake";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import MovingHandshakeComponent from "../components/QuickGameRoundScreen/MovingHandshakeComponent";
import { PlayerType } from "../constants/PlayerType";
import HandshakesWalkthroughComponent from "../components/QuickGameRoundScreen/HandshakesWalkthroughComponent";
import PersonImageWalkthroughComponent from "../components/QuickGameRoundScreen/PersonImageWalkthroughComponent";
import { initialState } from "../initials/QuickGameRoundScreen";
const { initialPersonHandshake, initialPerson, initialHandshake } = initialState;
import { globalState, nGlobalState } from "../global/QuickGameRoundScreen";
import { ScreenNames } from "../constants/ScreenNames";
import { FinishMsgTimeout, personHandshakeAnimationValues, playerHandshakeAnimationValues } from "../constants/QuickGameRoundScreen";
import useGlobalState from "../hooks/common/useGlobalState";
import useModal from "../hooks/common/useModal";
import EmptyModal from "../components/common/EmptyModal";
import { useNavigation } from "@react-navigation/native";
import useGoBack from "../hooks/common/useGoBack";

const QuickGameRoundScreen = () => {
  return (
    <WalkthroughProvider
      tooltipComponent={() => (
        <WalkthroughTooltip
          labels={{
            finish: "Ok",
            next: "Next",
            previous: "Previous",
            skip: "Skip",
          }}
        />
      )}
    >
      <QuickGameRoundComponent />
    </WalkthroughProvider>
  );
};

const QuickGameRoundComponent = () => {
  const dispatch = useDispatch();
  globalState.dispatch = dispatch;

  useGlobalState(globalState, useGoBack, [], null, null, true);
  useGlobalState(globalState, useWalkthroughShow, [ScreenNames.QuickGameRoundScreen, 1], null, null, true);
  //above is equivelant to below:
  // const { showWalkthrough, startWalkthrough } = useWalkthroughShow(ScreenNames.QuickGameRoundScreen, 1);
  // globalState.showWalkthrough = showWalkthrough;
  // globalState.startWalkthrough = startWalkthrough;
  useGlobalState(globalState, useState, [false], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
  //above is equivelant to below:
  //const [hasShakeEnded, setHasShakeEnded] = useState(false);
  //globalState.hasShakeEnded = hasShakeEnded;
  //globalState.setHasShakeEnded = setHasShakeEnded;
  useGlobalState(globalState, useState, [false], nGlobalState.hasShakeEnded, nGlobalState.setHasShakeEnded);
  useGlobalState(globalState, useState, [initialHandshake], nGlobalState.selectedHandshake, nGlobalState.setSelectedHandshake);
  useGlobalState(globalState, useState, [initialPersonHandshake], nGlobalState.selectedPersonHandshake, nGlobalState.setSelectedPersonHandshake);
  useGlobalState(globalState, useTimer, [], nGlobalState.timer, nGlobalState.setTimer);

  const personHandshakeAnimation = useAnimatedHandshake(PlayerType.PERSON, personHandshakeAnimationValues);
  const playerHandshakeAnimation = useAnimatedHandshake(PlayerType.PLAYER, playerHandshakeAnimationValues);
  globalState.personHandshakeAnimation = personHandshakeAnimation;
  globalState.playerHandshakeAnimation = playerHandshakeAnimation;

  // const { modalVisible, showModal, hideModal } = useModal();
  useGlobalState(globalState, useModal, [], null, null, true);

  useEffect(() => {
    if (globalState.hasShakeEnded == false) return;
    const finishMsgTimeout = setTimeout(() => {
      globalState.showModal();
    }, FinishMsgTimeout);
  }, [globalState.hasShakeEnded]);

  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700 flex items-center justify-between">
      <View className="mt-1">
        <TimerComponent />
      </View>
      <View className="-mt-0 z-50">
        <PersonImageWalkthroughComponent />
      </View>
      {!globalState.showWalkthrough && (
        <View className="z-0">
          <MovingHandshakeComponent playerType={PlayerType.PERSON} />
          <MovingHandshakeComponent playerType={PlayerType.PLAYER} />
        </View>
      )}
      {globalState.hasShakeEnded === false && (
        <View className="h-52 mb-6 space-y-2 flex items-center">
          <HandshakesWalkthroughComponent />
          <ShakeBtnComponent />
        </View>
      )}
      {globalState.hasShakeEnded === true && <PersonLineComponent />}

      {globalState.modalVisible && ( //for faster performance
        <EmptyModal hideModal={() => {}} modalVisible={globalState.modalVisible}>
          <LeaveMsgComponent />
        </EmptyModal>
      )}
    </SafeAreaView>
  );
};

const TimerComponent = () => {
  return (
    <View className="w-14 h-14 bg-[#eb1f1f] justify-center items-center flex rounded-full">
      <Text className="text-xl text-black-500 font-bold">{globalState.timer}</Text>
    </View>
  );
};

const ShakeBtnComponent = () => {
  const beginHandshake = () => {
    // globalState.setSelectedPersonHandshake(
    //   (prev) => handshakes[getRandomNumber(handshakes.length, 0, prev)] || new Handshake()
    //   // handshakes[0] || new Handshake()
    // );
    globalState.setTimer((prev) => 0);
    globalState.personHandshakeAnimation.values.opacity.stopAnimation(); //(opacity, positionY, etc... just one will stop all (bcz parallel))
    globalState.playerHandshakeAnimation.values.opacity.stopAnimation();
  };
  return (
    <View className="w-full items-center mt-7">
      <TouchableOpacity
        className="bg-yellow-500 px-14 py-4 rounded-sm"
        style={{ opacity: globalState.hasShakeStarted === true && 0.4 }}
        disabled={globalState.hasShakeStarted === true && true}
        onPress={beginHandshake}
      >
        <Text className="text-lg text-black-500">Shake!</Text>
      </TouchableOpacity>
    </View>
  );
};

const PersonLineComponent = () => {
  return (
    <View className="h-fit mb-6 space-y-2 flex items-center bg-black-600 p-5 pt-7">
      <Text className="text-xl text-white text-center">
        {initialPerson.name}:
        {globalState.selectedHandshake.id !== globalState.selectedPersonHandshake.id
          ? ` Haha, that was awkward! don't worry about it, `
          : ` Nice grip you got there! `}
      </Text>
      <Text className="text-center text-xl text-yellow-500">{initialPerson.signatureLine}!</Text>
    </View>
  );
};

const LeaveMsgComponent = () => {
  return (
    <View className="mt-52">
      <Text className="text-white w-72 text-center text-lg">{initialPerson.name} enjoyed that!, you can contact with him later</Text>
      <TouchableOpacity className="bg-yellow-500 px-14 py-4 rounded-sm mt-2" onPress={() => {}}>
        <Text className="text-xl text-black-500 text-center font-bold">Leave!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default QuickGameRoundScreen;
