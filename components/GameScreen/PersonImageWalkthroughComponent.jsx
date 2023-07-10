import { View, Text, Image } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { globalState } from "../../global/GameScreen";
import { PersonMeter } from "../../models/PersonMeter";
import { useDispatch, useSelector } from "react-redux";
import { meterReset, selectMeterByPersonId } from "../../features/PersonMeterSlice";
import { getPersonImage, getImageBasedOnHandshake } from "../../helpers/common/getPersonImage";
import { getRandomNumber } from "../../utils/common/getRandomNumber";

const WalkthroughView = walkthroughable(View);
const base = -45;
const moveBy = -350;

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
  const [randImageIndex, setRandImageIndex] = useState(0);
  useEffect(() => {
    if (!globalState.hasPlayStarted || globalState.isFirstEncounterEver) {
      return;
    }
    let newRandImageIndex = getRandomNumber(3);
    while (newRandImageIndex === randImageIndex) {
      newRandImageIndex = getRandomNumber(3);
    }
    setRandImageIndex((prev) => newRandImageIndex);
  }, [globalState.hasPlayStarted]);
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, globalState.person.id));
  let image = useMemo(() => {
    // if (globalState.hasShakeEnded == false) {
    //   return getPersonImage(meter.meterValue, globalState.person);
    // }
    return getImageBasedOnHandshake(
      meter.meterValue,
      globalState.person,
      globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id,
      globalState.isFirstEncounterEver,
      globalState.achievementResult.showAchievement
    );
  }, [globalState.timesPlayed, globalState.hasShakeEnded]); //why dependency is working like i want, dunno yet...
  return (
    <View className="relative w-64 h-64 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <PersonBarComponent meter={meter} />
      <View className="w-60 h-60 rounded-full mt-5">
        <Image
          style={{
            opacity: globalState.modalVisible ? 0.2 : 1,
            width: 1000,
            height: 340,
            marginLeft: -45,
            marginTop: -85,
            marginLeft: base + moveBy * randImageIndex,
          }}
          source={image}
          onLoad={() => globalState.showWalkthrough === true && globalState.startWalkthrough()}
        />
      </View>
    </View>
  );
};

const extraDisplayedWidth = 2.6;

const PersonBarComponent = ({ meter = 0 }) => {
  //const dispatch = useDispatch();
  //dispatch(meterReset({}));
  return (
    <View className="absolute opacity-30 top-20 h-7 border border-[#00000011] overflow-hidden blur-3xl" style={{ width: "100%" }}>
      <View className="opacity-10 bg-yellow-500 h-full" style={{ width: meter.meterValue * extraDisplayedWidth }}></View>
    </View>
  );
};

export default PersonImageWalkthroughComponent;
