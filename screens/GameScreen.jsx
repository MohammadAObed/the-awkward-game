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
import {
  FinishMsgTimeout,
  GameType,
  MaxTimesPlayed,
  TimerStartValue,
  personHandshakeAnimationValues,
  playerHandshakeAnimationValues,
} from "../constants/GameScreen";
import useGlobalState from "../hooks/common/useGlobalState";
import useModal from "../hooks/common/useModal";
import EmptyModal from "../components/common/EmptyModal";
import { useNavigation, useRoute } from "@react-navigation/native";
import { walkthroughReset } from "../features/walkthroughSlice";
import persons from "../data/Person";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import MovingHandshakesComponent from "../components/GameScreen/MovingHandshakesComponent";
import ShakeBtnComponent from "../components/GameScreen/ShakeBtnComponent";
import PersonLineComponent from "../components/GameScreen/PersonLineComponent";
import LeaveMsgComponent from "../components/GameScreen/LeaveMsgComponent";
import ShakeEndedBtnComponent from "../components/GameScreen/ShakeEndedBtnComponent";
import TimerComponent from "../components/GameScreen/TimerComponent";

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
  const { gameType, personId } = useRoute().params;
  globalState.gameType = gameType || GameType.Normal;
  initialState.initialPerson = personId ? persons.find((p) => p.id === personId) : initialState.initialPerson;
  const dispatch = useDispatch();
  globalState.dispatch = dispatch;
  const navigation = useNavigation();
  globalState.navigation = navigation;
  //dispatch(walkthroughReset({}));
  useGlobalState(globalState, useState, [initialState.initialPerson], nGlobalState.person, nGlobalState.setPerson);
  useGlobalState(globalState, useWalkthroughShow, [globalState, { ...initialState.showWalkthrough }], null, null, true);
  useGlobalState(globalState, useState, [initialState.hasShakeStarted], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
  useGlobalState(globalState, useState, [initialState.hasShakeEnded], nGlobalState.hasShakeEnded, nGlobalState.setHasShakeEnded);
  useGlobalState(globalState, useState, [initialState.personHadEnough], nGlobalState.personHadEnough, nGlobalState.setPersonHadEnough);
  useGlobalState(globalState, useState, [initialState.timesPlayed], nGlobalState.timesPlayed, nGlobalState.setTimesPlayed);
  useGlobalState(globalState, useState, [initialState.hasPlayStarted], nGlobalState.hasPlayStarted, nGlobalState.setHasPlayStarted);
  useGlobalState(globalState, useModal, [], null, null, true);

  function leaveScreen() {
    globalState.navigation.reset({
      index: 0,
      routes: [{ name: ScreenNames.HomeScreen }],
    });
  }

  function shakeAgain() {
    globalState.setSelectedPersonHandshake(handshakes[getRandomNumber(handshakes.length)]);
    globalState.setHasPlayStarted(true);
    globalState.setTimer(TimerStartValue);
    globalState.setHasShakeEnded(false);
    globalState.setHasShakeStarted(false);
  }

  function handleShakeEnded() {
    if (globalState.hasShakeEnded == false) return;
    globalState.setTimesPlayed((prev) => prev + 1);
    if (globalState.isFirstTime || globalState.timesPlayed >= MaxTimesPlayed || gameType === GameType.Quick) {
      globalState.setPersonHadEnough((prev) => true);
      const finishMsgTimeout = setTimeout(
        () => {
          globalState.showModal();
        },
        globalState.isFirstTime ? FinishMsgTimeout : FinishMsgTimeout / 2
      );
      return finishMsgTimeout;
    }
    return null;
  }

  useEffect(() => {
    const finishMsgTimeout = handleShakeEnded();
    return () => {
      clearTimeout(finishMsgTimeout);
    };
  }, [globalState.hasShakeEnded]);

  useEffect(() => {
    if (globalState.showWalkthrough !== false) return;
    globalState.setHasPlayStarted(true);
  }, [globalState.showWalkthrough]);
  return (
    <SafeAreaView className="relative flex-1 px-5 bg-black-700 flex items-center justify-between">
      {/* {globalState.gameType === GameType.Normal && (
        <TouchableOpacity className="absolute left-5 top-9" onPress={leaveScreen}>
          <ArrowLeftCircleIcon size={40} color="#111111aa" />
        </TouchableOpacity>
      )} */}

      <View className="mt-1">
        <TimerComponent />
      </View>
      <View className="-mt-0 z-50">
        <PersonImageWalkthroughComponent />
      </View>
      <View className="flex-row items-center">
        {!globalState.isFirstTime && globalState.hasShakeEnded && !globalState.personHadEnough && (
          <ShakeEndedBtnComponent handlePress={shakeAgain} btnText="Shake" />
        )}

        {!globalState.showWalkthrough && (
          <View className="z-0 boder -mx-7">
            <MovingHandshakesComponent />
          </View>
        )}
        {!globalState.isFirstTime && globalState.hasShakeEnded && !globalState.personHadEnough && (
          <ShakeEndedBtnComponent handlePress={leaveScreen} btnText="Leave" />
        )}
      </View>

      {globalState.hasShakeEnded === false && (
        <View className="h-52 mb-6 space-y-2 flex items-center w-full">
          <HandshakesWalkthroughComponent />
          {<ShakeBtnComponent />}
        </View>
      )}
      {globalState.hasShakeEnded === true && <PersonLineComponent />}

      {globalState.modalVisible && ( //for faster performance
        <EmptyModal hideModal={() => {}} modalVisible={globalState.modalVisible}>
          <LeaveMsgComponent leaveScreen={leaveScreen} />
        </EmptyModal>
      )}
    </SafeAreaView>
  );
};

export default GameScreen;
