import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useWalkthrough,
  WalkthroughProvider,
  WalkthroughStep,
  walkthroughable,
  WalkthroughTooltip,
} from "../libraries/walkthrough";
import { ChevronRightIcon } from "react-native-heroicons/solid";
const TopMargin = 50;

// const WalkthroughText = walkthroughable(Text);
const WalkthroughView = walkthroughable(View);

const QuickGameRoundScreen = () => {
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
      <QuickGameRound />
    </WalkthroughProvider>
  );
};

const QuickGameRound = () => {
  const { start } = useWalkthrough();

  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700 flex items-center justify-between">
      <View className="mt-14">
        <PersonImageWalkthrough start={start} />
      </View>
      <View className="w-14 h-14 bg-[#eb1f1f] justify-center items-center flex rounded-full">
        <Text className="text-xl text-black-500">7</Text>
      </View>
      <View className="h-52 mb-6 bg-wite space-y-2 ">
        <HandShakesWalkthrough start={start} />
      </View>
    </SafeAreaView>
  );
};

const PersonImageWalkthrough = ({ start }) => {
  return (
    <WalkthroughStep
      text="Quick! The Rock is approaching you"
      order={1}
      name="First"
    >
      <WalkthroughView>
        <PersonImage start={start} />
      </WalkthroughView>
    </WalkthroughStep>
  );
};

const PersonImage = ({ start }) => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  return (
    <View className="w-64 h-64 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <View className="w-60 h-60 bg-black-600 rounded-full mt-5">
        <Image
          className="w-full h-full"
          source={require("../assets/images/persons/RockHappy.png")}
          onLoad={() => start()}
        />
      </View>
    </View>
  );
};

const HandShakesWalkthrough = ({ start }) => {
  return (
    <WalkthroughStep
      text="Pick your handshake fast or he'll be upset"
      order={2}
      name="Second"
    >
      <WalkthroughView>
        <Handshakes start={start} />
      </WalkthroughView>
    </WalkthroughStep>
  );
};

const Handshakes = ({ start }) => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  return (
    <>
      <View className="relative w-96 h-24 bg-black-600 mt-5 px-2">
        <View className="absolute right-0 text-5xl text-white transform top-1/3 translate-y-1 z-10">
          <ChevronRightIcon size={23} color="#f7da7477" />
        </View>
        <ScrollView horizontal className="relative w-96 flex-1 py-1">
          <View className="w-full h-full flex-row justify-center items-center space-x-4">
            <Text className="text-4xl bg-[#00000033] rounded-md p-3">👍</Text>
            <Text className="text-4xl rounded-md p-3">✌</Text>
            <Text className="text-4xl rounded-md p-3">👋</Text>
            <Text className="text-4xl rounded-md p-3">🤚</Text>
            <Text className="text-4xl rounded-md p-3">🤚</Text>
            <Text className="text-4xl rounded-md p-3">🤚</Text>
            <Text className="text-4xl rounded-md p-3">🤚</Text>
            <Text className="text-4xl rounded-md p-3">🤚</Text>
            <Text className="text-4xl rounded-md p-3">🤚</Text>
          </View>
        </ScrollView>
      </View>
      <View className="w-full items-center mt-7">
        <TouchableOpacity className="bg-yellow-500 px-14 py-4">
          <Text className="text-lg text-black-500">Shake!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default QuickGameRoundScreen;
