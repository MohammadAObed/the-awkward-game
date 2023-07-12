import { View, Text, Image } from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { globalState } from "../../global/GameScreen";
import { PersonMeter } from "../../models/PersonMeter";
import { useDispatch, useSelector } from "react-redux";
import { meterReset, selectMeterByPersonId } from "../../features/PersonMeterSlice";
import { getImageBasedOnHandshake, getInitialImage } from "../../helpers/common/getPersonImage";

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
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, globalState.person.id));
  const [img, setImg] = useState(getInitialImage(meter.meterValue, globalState.person));
  useEffect(() => {
    if (globalState.hasShakeEnded == false) {
      return;
    }
    if (globalState.hasShakeEnded == true || img == null || globalState.isFirstEncounterEver || globalState.achievementResult.showAchievement) {
      let { newPersonImage } = getImageBasedOnHandshake(
        meter.meterValue,
        globalState.person,
        globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id,
        globalState.isFirstEncounterEver,
        globalState.achievementResult.showAchievement,
        img
      );
      setImg(newPersonImage);
    }
  }, [globalState.hasShakeEnded]);
  return (
    <View className="relative w-64 h-64 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <PersonBarComponent meter={meter} />
      <View className="w-60 h-60 rounded-full mt-5">
        <Image
          className="w-full h-full"
          style={{ opacity: globalState.modalVisible ? 0.2 : 1 }}
          source={img}
          onLoad={() => globalState.showWalkthrough === true && globalState.startWalkthrough()}
        />
      </View>
    </View>
  );
};

const extraDisplayedWidth = 2.6;

const PersonBarComponent = ({ meter = 0 }) => {
  return (
    <View className="absolute opacity-30 top-20 h-7 border border-[#00000011] overflow-hidden blur-3xl" style={{ width: "100%" }}>
      <View className="opacity-10 bg-yellow-500 h-full" style={{ width: meter.meterValue * extraDisplayedWidth }}></View>
    </View>
  );
};

export default PersonImageWalkthroughComponent;
