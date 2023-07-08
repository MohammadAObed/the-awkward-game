import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
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
  useGlobalState(globalState, useWalkthroughShow, [globalState, { ...initialState.showWalkthrough }], null, null, true);
  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <View className="mt-5">
        <PersonsListComponent />
      </View>
    </SafeAreaView>
  );
};

const PersonsListComponent = () => {
  const params = useRoute().params;
  const p = persons.find((p) => p.id === params?.personId ?? 0);
  const pIndex = persons.findIndex((p) => p.id === params?.personId ?? 0);
  let ps = [...persons];
  // if (index > -1) {
  if (pIndex > -1) {
    ps.splice(pIndex, 1);
    ps.unshift(p);
  }
  return (
    <View className="">
      {ps.map((p, index) => {
        return <PersonWalkthroughComponent key={p.id} person={p} isWalkthrough={index === 0 ? true : false} />;
      })}
    </View>
  );
};

export default PersonsScreen;
