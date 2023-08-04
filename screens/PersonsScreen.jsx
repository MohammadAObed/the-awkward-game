import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { WalkthroughProvider, WalkthroughStep, WalkthroughTooltip } from "../libraries/walkthrough";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalState, nGlobalState } from "../global/PersonsScreen";
import persons from "../data/Person";
import useGlobalState from "../hooks/common/useGlobalState";
import { initialState } from "../initials/PersonsScreen";
import useWalkthroughShow from "../hooks/common/useWalkthroughShow";
import { useDispatch, useSelector } from "react-redux";
import PersonWalkthroughComponent from "../components/PersonsScreen/PersonWalkthroughComponent";
import { ScreenNames } from "../constants/ScreenNames";
import useModal from "../hooks/common/useModal";
import { QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import TabsModal, { TabsEnum } from "../components/common/TabsModal";
import EmptyModal from "../components/common/EmptyModal";
import { Person } from "../models/Person";
import { PersonMeter } from "../models/PersonMeter";
import { selectMeterByPersonId } from "../features/PersonMeterSlice";
import { getInitialMoodAndImage } from "../helpers/common/getPersonMood";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import { meetupLines } from "../data/PersonMeetupLines";
import { GameType } from "../constants/GameScreen";

const PersonsScreen = () => {
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
      <PersonsComponent />
    </WalkthroughProvider>
  );
};

const PersonsComponent = () => {
  const navigation = useNavigation();
  globalState.navigation = navigation;
  const dispatch = useDispatch();
  globalState.dispatch = dispatch;
  useGlobalState(
    globalState,
    useWalkthroughShow,
    [
      globalState,
      { ...initialState.showWalkthrough },
      [() => require("../assets/audio/aiadam/ClickOnAContact.mp3"), () => require("../assets/audio/aiadam/barIndicatesLevelOf.mp3")],
    ],
    null,
    null,
    true
  );
  useGlobalState(globalState, useModal, [], null, null, true);
  useGlobalState(globalState, useState, [null], nGlobalState.person, nGlobalState.setPerson);

  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <View className="mt-5 mb-5">
        <PersonsListComponent />
      </View>
      <EmptyModal hideModal={globalState.hideModal} modalVisible={globalState.modalVisible}>
        <PersonModalContentComponent />
      </EmptyModal>
    </SafeAreaView>
  );
};

const HelpIndex = 1;

const PersonsListComponent = () => {
  //! if meter value is bigger, then its first, etc....
  const params = useRoute().params;

  let personsList = useMemo(() => {
    return [...persons];
  }, []);
  useEffect(() => {
    const p = persons.find((p) => p.id === params?.personId ?? 0);
    const pIndex = persons.findIndex((p) => p.id === params?.personId ?? 0);
    if (pIndex > -1) {
      personsList.splice(pIndex, 1);
      personsList.unshift(p);
    }
  }, []);

  return (
    <>
      <FlatList
        data={personsList}
        renderItem={({ item, index }) => {
          return (
            <>
              {HelpIndex === index ? (
                <>
                  <PersonWalkthroughComponent person={item} isWalkthrough={index === 0 ? true : false} />
                  <HelpComponent />
                </>
              ) : (
                <PersonWalkthroughComponent person={item} isWalkthrough={index === 0 ? true : false} />
              )}
            </>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const HelpComponent = () => {
  const showHelp = (e) => {};
  const { hideModal, modalVisible, showModal } = useModal();
  return (
    <>
      <TouchableOpacity className="p-2 rounded-xl bg-black-500 mt-5 flex-row justify-center items-center" onPress={showModal}>
        <TouchableOpacity className="p-2" onPress={showModal}>
          <QuestionMarkCircleIcon size={40} color={"gray"} />
        </TouchableOpacity>
      </TouchableOpacity>
      {modalVisible && ( //for faster performance
        <TabsModal hideModal={hideModal} modalVisible={modalVisible} selectedTab={TabsEnum.HINT} showCredits={true} />
      )}
    </>
  );
};

const PersonModalContentComponent = () => {
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, globalState.person.id));
  let mood = useMemo(() => getInitialMoodAndImage(meter.meterValue, globalState.person), [globalState.person.id]);
  const img = globalState.person.images[mood.name]()[mood.imageIndex];
  const greeting = useMemo(() => {
    const personMeetupLines = meetupLines.find((ml) => ml.personId === globalState.person.id);
    const personLines = personMeetupLines
      ? meetupLines.find((ml) => ml.personId === globalState.person.id)[mood.name]() || []
      : globalState.person.lines[mood.name]() || [];
    //const personLines = globalState.person.lines[mood.name]() || [];
    return personLines[getRandomNumber(personLines?.length || 0)];
  }, [globalState.person.id]);
  const navigateToGame = () => {
    if (globalState.showWalkthrough === true) {
      return;
    }
    globalState.navigation.reset({
      index: 0,
      routes: [{ name: ScreenNames.GameScreen, params: { gameType: GameType.NORMAL, personId: globalState.person.id } }], //testing bcs personmood is funky, and when console logging here in this screen, and update some state in my gamescreen, the log here is called, wtf bitch
    });
    //globalState.navigation.navigate(ScreenNames.GameScreen, { gameType: GameType.NORMAL, personId: person.id });
  };
  return (
    <View className="flex items-center space-y-6 bg-[#111111ee] py-10 px-10 rounded-lg">
      <View className="w-40 h-40 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
        <View className="w-40 h-40 bg-black-600 rounded-full mt-1">
          <Image className="w-full h-full" source={img} />
        </View>
      </View>
      <Text className="text-lg text-white text-center w-52">{greeting}</Text>
      <TouchableOpacity className="bg-yellow-500 py-3 px-16 rounded-md mt-5" onPress={navigateToGame}>
        <Text className=" text-black-500 text-center">Meet up {globalState.person.signatureHandshake.symbol}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonsScreen;
