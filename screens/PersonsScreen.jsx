import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { WalkthroughProvider, WalkthroughStep, WalkthroughTooltip } from "../libraries/walkthrough";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { globalState } from "../global/PersonsScreen";
import persons from "../data/Person";
import useGlobalState from "../hooks/common/useGlobalState";
import { initialState } from "../initials/PersonsScreen";
import useWalkthroughShow from "../hooks/common/useWalkthroughShow";
import { useDispatch } from "react-redux";
import PersonWalkthroughComponent from "../components/PersonsScreen/PersonWalkthroughComponent";

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
  return (
    <View className="">
      {persons.map((p, index) => {
        return <PersonWalkthroughComponent key={p.id} person={p} isWalkthrough={index === 0 ? true : false} />;
      })}
    </View>
  );
};

export default PersonsScreen;
