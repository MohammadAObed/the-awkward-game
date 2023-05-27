import { View, Text, Image, TouchableOpacity, Button, ScrollView, Pressable, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WalkthroughProvider, WalkthroughTooltip } from "../libraries/walkthrough";
import handshakes from "../data/Handshake";
import { useDispatch } from "react-redux";
import useTimer from "../hooks/GameScreen/useTimer";
import useWalkthroughShow from "../hooks/common/useWalkthroughShow";
import useAnimatedHandshake from "../hooks/GameScreen/useAnimatedHandshake";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import MovingHandshakeComponent from "../components/GameScreen/MovingHandshakeComponent";
import { PlayerType } from "../constants/PlayerType";
import HandshakesWalkthroughComponent from "../components/GameScreen/HandshakesWalkthroughComponent";
import PersonImageWalkthroughComponent from "../components/GameScreen/PersonImageWalkthroughComponent";
import { initialState } from "../initials/GameScreen";
const { initialPersonHandshake, initialPerson, initialHandshake } = initialState;
import { globalState, nGlobalState } from "../global/GameScreen";
import { ScreenNames } from "../constants/ScreenNames";
import { FinishMsgTimeout, personHandshakeAnimationValues, playerHandshakeAnimationValues } from "../constants/GameScreen";
import useGlobalState from "../hooks/common/useGlobalState";
import useModal from "../hooks/common/useModal";
import EmptyModal from "../components/common/EmptyModal";
import { useNavigation } from "@react-navigation/native";
import { walkthroughReset } from "../features/walkthroughSlice";

const GameScreen = () => {
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
      <GameComponent />
    </WalkthroughProvider>
  );
};

const GameComponent = () => {
  const dispatch = useDispatch();
  globalState.dispatch = dispatch;
  const navigation = useNavigation();
  globalState.navigation = navigation;
  //dispatch(walkthroughReset({}));

  useGlobalState(globalState, useWalkthroughShow, [globalState, { ...initialState.showWalkthrough }], null, null, true);
  useGlobalState(globalState, useState, [initialState.hasShakeStarted], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
  useGlobalState(globalState, useState, [initialState.hasShakeEnded], nGlobalState.hasShakeEnded, nGlobalState.setHasShakeEnded);
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
          <MovingHandshakesComponent />
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

const MovingHandshakesComponent = () => {
  useGlobalState(globalState, useState, [initialHandshake], nGlobalState.selectedHandshake, nGlobalState.setSelectedHandshake);
  useGlobalState(globalState, useState, [initialPersonHandshake], nGlobalState.selectedPersonHandshake, nGlobalState.setSelectedPersonHandshake);

  const personHandshakeAnimation = useAnimatedHandshake(PlayerType.PERSON, personHandshakeAnimationValues);
  const playerHandshakeAnimation = useAnimatedHandshake(PlayerType.PLAYER, playerHandshakeAnimationValues);
  globalState.personHandshakeAnimation = personHandshakeAnimation;
  globalState.playerHandshakeAnimation = playerHandshakeAnimation;
  return (
    <>
      <MovingHandshakeComponent playerType={PlayerType.PERSON} />
      <MovingHandshakeComponent playerType={PlayerType.PLAYER} />
    </>
  );
};

const TimerComponent = () => {
  useGlobalState(globalState, useTimer, [], nGlobalState.timer, nGlobalState.setTimer);

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
  const navigation = useNavigation();
  return (
    <View className="mt-52">
      <Text className="text-white w-72 text-center text-lg">{initialPerson.name} enjoyed that!, you can contact with him later</Text>
      <TouchableOpacity
        className="bg-yellow-500 px-14 py-4 rounded-sm mt-2"
        onPress={() => {
          globalState.navigation.reset({
            index: 0,
            routes: [{ name: ScreenNames.HomeScreen }],
          });
        }}
      >
        <Text className="text-xl text-black-500 text-center font-bold">Leave!</Text>
      </TouchableOpacity>
    </View>
  );
};
export default GameScreen;
