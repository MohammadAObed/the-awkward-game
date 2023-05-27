import { View, Text, Image } from "react-native";
import React from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { initialState } from "../../initials/GameScreen";
import { globalState } from "../../global/GameScreen";
const { initialPerson } = initialState;

const WalkthroughView = walkthroughable(View);

const PersonImageWalkthroughComponent = () => {
  return (
    <View className="-mt-0 z-50">
      <WalkthroughStep text={`Quick! ${initialPerson.name} is approaching you`} order={1} name="First">
        <WalkthroughView>
          <PersonImageComponent />
        </WalkthroughView>
      </WalkthroughStep>
    </View>
  );
};

const PersonImageComponent = () => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  return (
    <View className="w-64 h-64 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <View className="w-60 h-60 bg-black-600 rounded-full mt-5">
        <Image
          className="w-full h-full"
          style={{ opacity: globalState.modalVisible ? 0.2 : 1 }}
          source={globalState.hasShakeEnded ? initialPerson.images.Happy : initialPerson.images.Normal}
          onLoad={() => globalState.showWalkthrough === true && globalState.startWalkthrough()}
        />
      </View>
    </View>
  );
};

export default PersonImageWalkthroughComponent;
