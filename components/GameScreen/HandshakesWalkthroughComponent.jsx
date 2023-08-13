import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Handshake } from "../../models/Handshake";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import handshakes from "../../data/Handshake";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { globalState } from "../../global/GameScreen";
import { Person } from "../../models/Person";

const WalkthroughView = walkthroughable(View);

const HandshakesWalkthroughComponent = () => {
  return (
    <WalkthroughStep text="Choose your handshake fast or it'll get awkward" order={2} name="Second">
      <WalkthroughView>
        <HandshakesComponent />
      </WalkthroughView>
    </WalkthroughStep>
  );
};

const HandshakesComponent = () => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  const filteredHandshakes = useMemo(() => sortHandshakes(globalState.person, handshakes), []);
  const [selectedHandshakeId, setSelectedHandshakeId] = useState(globalState.selectedPlayerHandshake.id);
  const selectHandshake = (handshake = new Handshake()) => {
    if (globalState.timer <= 0) return;
    setSelectedHandshakeId(handshake.id);
    globalState.setSelectedPlayerHandshake((prev) => handshake);
  };
  return (
    <View className="relative w-96 h-24 bg-black-600 mt-5 px-2">
      <View className="absolute right-0 text-5xl text-white transform top-1/3 translate-y-1 z-10">
        {filteredHandshakes.length > 6 && <ChevronRightIcon size={23} color="#f7da7477" />}
      </View>
      <ScrollView horizontal className="relative w-full flex-1 py-1">
        <View className="w-full h-full flex-row justify-center items-center space-x-4">
          {filteredHandshakes.map((handshake) => (
            <HandshakeComponent
              key={handshake.id}
              handshake={handshake}
              selectHandshake={selectHandshake}
              isSelected={handshake.id === selectedHandshakeId}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const HandshakeComponent = ({ handshake = new Handshake(), isSelected, selectHandshake }) => {
  const style = `flex rounded-md p-3 ${isSelected && `bg-black-700`} ${globalState.timer <= 0 && `opacity-70`}`;
  return (
    <TouchableOpacity className={style + "space-y-3"} onPress={() => selectHandshake(handshake)}>
      <Text className="text-3xl" style={{ transform: [{ rotate: `${handshake.rotation}deg` }, { scaleX: handshake.invert }] }}>
        {handshake.symbol}
      </Text>
    </TouchableOpacity>
  );
};

export default HandshakesWalkthroughComponent;

function sortHandshakes(person = new Person(), handshakes = [new Handshake()]) {
  const { highChance, lowChance, medChance } = person.handshakesOccurance;
  const newArr = [...highChance.ids.slice(0, 2), person.signatureHandshake.id, ...highChance.ids.slice(2)];
  const handshakeChances = [...newArr, ...medChance.ids, ...lowChance.ids];
  let filteredHandshakes = handshakes.filter((h) => handshakeChances.includes(h.id));
  filteredHandshakes = filteredHandshakes.sort((a, b) => {
    const indexA = handshakeChances.indexOf(a.id);
    const indexB = handshakeChances.indexOf(b.id);
    return indexA - indexB;
  });
  return filteredHandshakes;
}
