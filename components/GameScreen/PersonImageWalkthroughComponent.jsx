import { View, Text, Image } from "react-native";
import React from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { globalState } from "../../global/GameScreen";
import { PersonMeter } from "../../models/PersonMeter";
import { useDispatch, useSelector } from "react-redux";
import { meterReset, selectMeterByPersonId } from "../../features/PersonMeterSlice";

const WalkthroughView = walkthroughable(View);

const PersonImageWalkthroughComponent = () => {
  return (
    <View className="-mt-0 z-50">
      <WalkthroughStep text={`Quick! ${globalState.person.name} is approaching you`} order={1} name="First">
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
    <View className="relative w-64 h-64 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <PersonBarComponent />
      <View className="w-60 h-60 rounded-full mt-5">
        <Image
          className="w-full h-full"
          style={{ opacity: globalState.modalVisible ? 0.2 : 1 }}
          source={globalState.hasShakeEnded ? globalState.person.images.Happy : globalState.person.images.Normal}
          onLoad={() => globalState.showWalkthrough === true && globalState.startWalkthrough()}
        />
      </View>
    </View>
  );
};

const extraDisplayedWidth = 2.6;

const PersonBarComponent = () => {
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, globalState.person.id));
  //const dispatch = useDispatch();
  //dispatch(meterReset({}));
  return (
    <View className="absolute opacity-30 top-20 h-7 border border-[#00000011] overflow-hidden blur-3xl" style={{ width: "100%" }}>
      <View className="opacity-10 bg-yellow-500 h-full" style={{ width: meter.meterValue * extraDisplayedWidth }}></View>
    </View>
  );
};

export default PersonImageWalkthroughComponent;
