import { View, Text } from "react-native";
import React from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { Person } from "../../models/Person";

const WalkthroughView = walkthroughable(View);

const PersonBarWalkthroughComponent = ({ isWalkthrough = false, person = new Person() }) => {
  return (
    <>
      {isWalkthrough ? (
        <WalkthroughStep text={`Bar indicates how much you're friends with ${person.name}`} order={2} name="Second">
          <WalkthroughView>
            <PersonBarComponent />
          </WalkthroughView>
        </WalkthroughStep>
      ) : (
        <PersonBarComponent />
      )}
    </>
  );
};

const PersonBarComponent = () => {
  return (
    <View className="w-32 h-2.5 border border-black-700 overflow-hidden">
      <View className="bg-yellow-500 w-10 h-full"></View>
    </View>
  );
};

export default PersonBarWalkthroughComponent;
