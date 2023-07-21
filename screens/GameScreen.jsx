import { View, Text, Image, TouchableOpacity, Button, ScrollView, Pressable, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WalkthroughProvider, WalkthroughTooltip } from "../libraries/walkthrough";
import handshakes from "../data/Handshake";
import { useDispatch, useSelector } from "react-redux";
import useTimer from "../hooks/GameScreen/useTimer";
import useWalkthroughShow from "../hooks/common/useWalkthroughShow";
import useAnimatedHandshake from "../hooks/GameScreen/useAnimatedHandshake";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import MovingHandshakeComponent from "../components/GameScreen/MovingHandshakeComponent";
import { PlayerType } from "../constants/PlayerType";
import HandshakesWalkthroughComponent from "../components/GameScreen/HandshakesWalkthroughComponent";
import PersonImageWalkthroughComponent from "../components/GameScreen/PersonImageWalkthroughComponent";
import { initialState } from "../initials/GameScreen";
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
import { meterReset, selectMeterByPersonId } from "../features/PersonMeterSlice";
import { playerAchievementReset, selectPlayerAchievementsByPersonId } from "../features/PlayerAchievementSlice";
import { handlePlayerAchievements, handleShakeEnded, leaveScreen, mShakeAgain } from "../helpers/GameScreen";
import GifComponent from "../components/GameScreen/GifComponent";

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
  //#region Global variables initialization
  const { gameType, personId } = useRoute().params;
  globalState.gameType = gameType || GameType.NORMAL;
  initialState.initialPerson = personId ? persons.find((p) => p.id === personId) : initialState.initialPerson;
  //#endregion
  //#region Global State
  const dispatch = useDispatch();
  globalState.dispatch = dispatch;
  const navigation = useNavigation();
  globalState.navigation = navigation;
  const playerPersonAchievementList = useSelector((state) => selectPlayerAchievementsByPersonId(state, globalState.person.id));
  globalState.playerPersonAchievementList = playerPersonAchievementList;
  let meter = useSelector((state) => selectMeterByPersonId(state, globalState.person.id));
  globalState.meter = meter;
  //#endregion
  //#region use Global State
  useGlobalState(globalState, useState, [initialState.initialPerson], nGlobalState.person, nGlobalState.setPerson);
  useGlobalState(globalState, useWalkthroughShow, [globalState, { ...initialState.showWalkthrough }], null, null, true);
  useGlobalState(globalState, useState, [initialState.hasShakeStarted], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
  useGlobalState(globalState, useState, [initialState.hasShakeEnded], nGlobalState.hasShakeEnded, nGlobalState.setHasShakeEnded);
  useGlobalState(globalState, useState, [initialState.personHadEnough], nGlobalState.personHadEnough, nGlobalState.setPersonHadEnough);
  useGlobalState(globalState, useState, [initialState.timesPlayed], nGlobalState.timesPlayed, nGlobalState.setTimesPlayed);
  useGlobalState(globalState, useState, [initialState.hasPlayStarted], nGlobalState.hasPlayStarted, nGlobalState.setHasPlayStarted);
  useGlobalState(globalState, useState, [initialState.gifVisible], nGlobalState.gifVisible, nGlobalState.setGifVisible);
  useGlobalState(globalState, useModal, [], null, null, true);
  useGlobalState(globalState, useState, [initialState.achievementResult], nGlobalState.achievementResult, nGlobalState.setAchievementResult);
  useGlobalState(
    globalState,
    useState,
    [initialState.getPersonMood(meter.meterValue, globalState.person)],
    nGlobalState.personMood,
    nGlobalState.setPersonMood
  );
  //#endregion
  //#region useEffect
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
  //#endregion
  return (
    <SafeAreaView className="relative flex-1 px-5 bg-black-700 flex items-center justify-between">
      <View className="mt-1">
        <TimerComponent />
      </View>
      <View className="-mt-0 z-50">
        <PersonImageWalkthroughComponent />
      </View>
      <View className="flex-row items-center">
        {!globalState.isFirstEncounterEver && globalState.hasShakeEnded && !globalState.personHadEnough && (
          <ShakeEndedBtnComponent handlePress={leaveScreen} btnText="Leave 👋" />
        )}
        {!globalState.showWalkthrough && (
          <View className="z-0 boder -mx-7">
            <MovingHandshakesComponent />
          </View>
        )}
        {!globalState.isFirstEncounterEver && globalState.hasShakeEnded && !globalState.personHadEnough && (
          <ShakeEndedBtnComponent handlePress={mShakeAgain} btnText="Shake 🤝" />
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
          {globalState.gifVisible === true ? (
            <GifComponent leaveScreen={(e) => leaveScreen(e, ScreenNames.AchievementsScreen)}></GifComponent>
          ) : (
            <LeaveMsgComponent leaveScreen={leaveScreen} />
          )}
        </EmptyModal>
      )}
    </SafeAreaView>
  );
};

export default GameScreen;
