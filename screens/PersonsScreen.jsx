import { View, FlatList } from "react-native";
import React, { useEffect, useMemo } from "react";
import { WalkthroughProvider, WalkthroughStep, WalkthroughTooltip } from "../libraries/walkthrough";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalState } from "../global/PersonsScreen";
import persons from "../data/Person";
import useGlobalState from "../hooks/common/useGlobalState";
import { initialState } from "../initials/PersonsScreen";
import useWalkthroughShow from "../hooks/common/useWalkthroughShow";
import { useDispatch } from "react-redux";
import PersonWalkthroughComponent from "../components/PersonsScreen/PersonWalkthroughComponent";
import { ScreenNames } from "../constants/ScreenNames";

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
  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <View className="mt-5 mb-5">
        <PersonsListComponent />
      </View>
    </SafeAreaView>
  );
};

const HelpIndex = 2;

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
        renderItem={({ item, index }) => (
          <PersonWalkthroughComponent person={item} isWalkthrough={index === 0 ? true : false} isHelp={index === HelpIndex} />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default PersonsScreen;
