import { View, Text, Image } from "react-native";
import React from "react";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import { Person } from "../../models/Person";
import { globalState } from "../../global/PersonsScreen";
import { PersonMeter } from "../../models/PersonMeter";
import { useSelector } from "react-redux";
import { selectMeterByPersonId } from "../../features/PersonMeterSlice";
import { getInitialMoodAndImage } from "../../helpers/common/getPersonMood";

const WalkthroughView = walkthroughable(View);

// const PersonImageComponent = () => {
//   return (
//     <View className="-mt-0 z-50">
//       <WalkthroughStep text={`Quick! ${initialPerson.name} is approaching you`} order={1} name="First">
//         <WalkthroughView>
//           <PersonImageComponent />
//         </WalkthroughView>
//       </WalkthroughStep>
//     </View>
//   );
// };

const PersonImageComponent = ({ person = new Person() }) => {
  // This Won't Work Somehow: useEffect(() => { start();}, []);
  let meter = new PersonMeter();
  meter = useSelector((state) => selectMeterByPersonId(state, person.id));
  let mood = getInitialMoodAndImage(meter.meterValue, person);
  const img = person.images[mood.mood.name]()[mood.imageIndex];
  return (
    <View className="w-16 h-16 bg-black-600 rounded-full flex items-center justify-center overflow-hidden">
      <View className="w-16 h-16 bg-black-600 rounded-full mt-1">
        <Image className="w-full h-full" source={img} onLoad={() => globalState.showWalkthrough === true && globalState.startWalkthrough()} />
      </View>
    </View>
  );
};

export default PersonImageComponent;
