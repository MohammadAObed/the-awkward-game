import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import EmptyModal from "../components/common/EmptyModal";
import GifComponent from "../components/GameScreen/GifComponent";
import HandshakesWalkthroughComponent from "../components/GameScreen/HandshakesWalkthroughComponent";
import LeaveMsgComponent from "../components/GameScreen/LeaveMsgComponent";
import MovingHandshakesComponent from "../components/GameScreen/MovingHandshakesComponent";
import PersonImageWalkthroughComponent from "../components/GameScreen/PersonImageWalkthroughComponent";
import PersonLineComponent from "../components/GameScreen/PersonLineComponent";
import ShakeBtnComponent from "../components/GameScreen/ShakeBtnComponent";
import ShakeEndedBtnComponent from "../components/GameScreen/ShakeEndedBtnComponent";
import TimerComponent from "../components/GameScreen/TimerComponent";
import { GameType } from "../constants/GameScreen";
import { ScreenNames } from "../constants/ScreenNames";
import persons from "../data/Person";
import { selectMeterByPersonId } from "../features/PersonMeterSlice";
import { selectPlayerAchievementsByPersonId } from "../features/PlayerAchievementSlice";
import { globalState, nGlobalState } from "../global/GameScreen";
import { getInitialMoodAndImage } from "../helpers/common/getPersonMood";
import { handleShakeEnded, leaveScreen, mShakeAgain } from "../helpers/GameScreen";
import useGlobalState from "../hooks/common/useGlobalState";
import useModal from "../hooks/common/useModal";
import useWalkthroughShow from "../hooks/common/useWalkthroughShow";
import { initialState } from "../initials/GameScreen";
import { WalkthroughProvider, WalkthroughTooltip } from "../libraries/walkthrough";

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
  //! all useGlobal state must be before anything (maybe, cuz this happened with meter and images problem (its logical, bcz i should use globalstate.person after the useGlobalState),  we were using the previous person from global state so the meter were not getting the current person meter, so useglobal must be before, i fixed other way but its how it supposed to be)
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
  const playerPersonAchievementList = useSelector((state) => selectPlayerAchievementsByPersonId(state, initialState.initialPerson.id));
  globalState.playerPersonAchievementList = playerPersonAchievementList;
  let meter = useSelector((state) => selectMeterByPersonId(state, initialState.initialPerson.id));
  globalState.meter = meter;
  //#endregion
  //#region use Global State
  useGlobalState(globalState, useState, [initialState.initialPerson], nGlobalState.person, nGlobalState.setPerson);
  useGlobalState(
    globalState,
    useWalkthroughShow,
    [
      globalState,
      { ...initialState.showWalkthrough },
      [
        () => require("../assets/audio/aiadam/QuickYouAreBeingApproached.mp3"),
        () => require("../assets/audio/aiadam/ChooseYourHandshakeFast.mp3"),
      ],
    ],
    null,
    null,
    true
  );
  useGlobalState(globalState, useState, [initialState.hasShakeStarted], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
  useGlobalState(globalState, useState, [initialState.hasShakeEnded], nGlobalState.hasShakeEnded, nGlobalState.setHasShakeEnded);
  useGlobalState(globalState, useState, [initialState.personHadEnough], nGlobalState.personHadEnough, nGlobalState.setPersonHadEnough);
  useGlobalState(globalState, useState, [initialState.timesPlayed], nGlobalState.timesPlayed, nGlobalState.setTimesPlayed);
  useGlobalState(globalState, useState, [initialState.hasPlayStarted], nGlobalState.hasPlayStarted, nGlobalState.setHasPlayStarted);
  useGlobalState(globalState, useState, [initialState.gifVisible], nGlobalState.gifVisible, nGlobalState.setGifVisible);
  useGlobalState(globalState, useModal, [], null, null, true);
  useGlobalState(globalState, useState, [initialState.achievementResult], nGlobalState.achievementResult, nGlobalState.setAchievementResult);
  initialState.getPersonMood = getInitialMoodAndImage(meter.meterValue, initialState.initialPerson) || initialState.getPersonMood;
  useGlobalState(globalState, useState, [initialState.getPersonMood], nGlobalState.personMood, nGlobalState.setPersonMood, false, true);
  useGlobalState(
    globalState,
    useState,
    [initialState.getPersonMoodSoundCount],
    nGlobalState.personMoodSoundCount,
    nGlobalState.setPersonMoodSoundCount,
    false,
    true
  );
  useGlobalState(
    globalState,
    useState,
    [initialState.isPersonSoundPlaying],
    nGlobalState.isPersonSoundPlaying,
    nGlobalState.setIsPersonSoundPlaying
  );
  useGlobalState(globalState, useState, [false], nGlobalState.hasPressedShake, nGlobalState.setHasPressedShake);
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
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  }, []);
  //#endregion
  return (
    <SafeAreaView className="relative flex-1 px-5 bg-black-700 flex items-center justify-between">
      <View className="mt-1">
        <TimerComponent />
      </View>
      <View className="-mt-4 z-50">
        <PersonImageWalkthroughComponent />
      </View>
      <View className="flex-row items-center">
        {!globalState.isFirstEncounterEver && globalState.hasShakeEnded && !globalState.personHadEnough && (
          <ShakeEndedBtnComponent handlePress={leaveScreen} btnText="Leave 👋" />
        )}
        {!globalState.showWalkthrough && (
          <View className="z-0 -mx-7">
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

      {globalState.modalVisible && !globalState.isPersonSoundPlaying && (
        //for faster performance
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
