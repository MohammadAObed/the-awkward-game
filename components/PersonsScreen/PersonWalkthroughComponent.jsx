import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Person } from "../../models/Person";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import PersonImageComponent from "./PersonImageComponent";
import PersonBarWalkthroughComponent from "./PersonBarWalkthroughComponent";
import { PhoneIcon } from "react-native-heroicons/solid";
import { GameType } from "../../constants/GameScreen";
import { ScreenNames } from "../../constants/ScreenNames";
import { globalState } from "../../global/PersonsScreen";

const WalkthroughView = walkthroughable(View);

const PersonWalkthroughComponent = ({ person = new Person(), isWalkthrough = false }) => {
  return (
    <>
      {isWalkthrough ? (
        <WalkthroughStep text={`Click on a contact to meet a friend`} order={1} name="First">
          <WalkthroughView>
            <PersonComponent key={person.id} person={person} isWalkthrough={true} />
          </WalkthroughView>
        </WalkthroughStep>
      ) : (
        <PersonComponent key={person.id} person={person} />
      )}
    </>
  );
};

const PersonComponent = ({ person = new Person(), isWalkthrough }) => {
  return (
    <TouchableOpacity
      className="p-2 rounded-xl bg-black-500 mt-5 flex-row justify-between items-center"
      onPress={() => {
        globalState.setPerson(person);
        globalState.showModal();
      }}
    >
      <View className="flex-row items-center space-x-2">
        <PersonImageComponent person={person} />
        <View className="">
          <Text className="text-white mb-2">{person.name}</Text>
          {<PersonBarWalkthroughComponent isWalkthrough={isWalkthrough} person={person} />}
        </View>
      </View>

      <TouchableOpacity
        className="p-2"
        onPress={() => {
          globalState.setPerson(person);
          globalState.showModal();
        }}
      >
        <PhoneIcon size={23} color={"gray"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PersonWalkthroughComponent;
