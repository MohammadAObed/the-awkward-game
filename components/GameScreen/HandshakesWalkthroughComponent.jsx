import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Handshake } from "../../models/Handshake";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import handshakes from "../../data/Handshake";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { globalState } from "../../global/GameScreen";

const WalkthroughView = walkthroughable(View);

const HandshakesWalkthroughComponent = () => {
  return (
    <WalkthroughStep text="Pick your handshake fast or he'll be upset" order={2} name="Second">
      <WalkthroughView>
        <HandshakesComponent />
      </WalkthroughView>
    </WalkthroughStep>
  );
};

const HandshakesComponent = () => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  return (
    <View className="relative w-96 h-24 bg-black-600 mt-5 px-2">
      <View className="absolute right-0 text-5xl text-white transform top-1/3 translate-y-1 z-10">
        <ChevronRightIcon size={23} color="#f7da7477" />
      </View>
      <ScrollView horizontal className="relative w-full flex-1 py-1">
        <View className="w-full h-full flex-row justify-center items-center space-x-4">
          {handshakes.map((handshake) => (
            <HandshakeComponent key={handshake.id} handshake={handshake} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const HandshakeComponent = ({ handshake = new Handshake() }) => {
  const isSelected = globalState.selectedPlayerHandshake.id === handshake.id;
  const style = `text-4xl rounded-md p-3 ${handshake.rotation} ${isSelected && `bg-black-700`} ${globalState.timer <= 0 && `opacity-70`}`;
  return (
    <TouchableOpacity onPress={() => globalState.timer > 0 && globalState.setSelectedPlayerHandshake(handshake)}>
      <Text className={style}>{handshake.symbol}</Text>
    </TouchableOpacity>
  );
};

export default HandshakesWalkthroughComponent;
