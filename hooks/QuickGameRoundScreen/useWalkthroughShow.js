import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWalkthroughSliceByScreenNameAndListOrder, walkthroughUpdate } from "../../features/walkthroughSlice";
import { useWalkthrough } from "../../libraries/walkthrough";
import { globalState } from "../../global/QuickGameRoundScreen";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../constants/ScreenNames";

export default useWalkthroughShow = (screenName = "", listOrder = 1) => {
  const { start, stop, walkthroughEvents, currentStep } = useWalkthrough();
  const walkthroughObj = useSelector((state) => selectWalkthroughSliceByScreenNameAndListOrder(state, screenName, listOrder));
  const [showWalkthrough, setShowWalkthrough] = useState(walkthroughObj.show); //change true to the state in the storage
  const navigation = useNavigation();

  useEffect(() => {
    const walkthroughOnStop = () => {
      // walkthrough tutorial finished!
      globalState.dispatch(
        walkthroughUpdate({
          screenName,
          listOrder,
          show: false,
        })
      );
      setShowWalkthrough(false);
    };

    walkthroughEvents.on("stop", walkthroughOnStop);
    return () => {
      walkthroughEvents.off("stop", walkthroughOnStop);
    };
  }, [showWalkthrough]);
  return {
    showWalkthrough,
    // setShowWalkthrough,
    startWalkthrough: start,
    // stopWalkthrough: stop,
  };
};
