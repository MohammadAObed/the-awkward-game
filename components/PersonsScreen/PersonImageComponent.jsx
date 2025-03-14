import { Image } from "expo-image";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectMeterByPersonId } from "../../features/PersonMeterSlice";
import { globalState } from "../../global/PersonsScreen";
import { getInitialMoodAndImage } from "../../helpers/common/getPersonMood";
import { walkthroughable } from "../../libraries/walkthrough";
import { Person } from "../../models/Person";
import { PersonMeter } from "../../models/PersonMeter";

const WalkthroughView = walkthroughable(View);

const PersonImageComponent = ({ person = new Person() }) => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, person.id));
  let mood = useMemo(() => getInitialMoodAndImage(meter.meterValue, person), []);
  const img = person.images[mood.name]()[mood.imageIndex];
  return (
    <View className="w-16 h-16 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <View className="w-16 h-16 bg-black-600 rounded-full mt-1">
        <Image className="w-full h-full" source={img} onLoad={() => globalState.showWalkthrough === true && globalState.startWalkthrough()} />
      </View>
    </View>
  );
};

export default PersonImageComponent;
