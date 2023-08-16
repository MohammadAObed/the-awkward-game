import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWalkthroughSliceByScreenNameAndListOrder, walkthroughUpdate } from "../../features/walkthroughSlice";
import { useWalkthrough } from "../../libraries/walkthrough";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../constants/ScreenNames";
import { playAudio } from "../../utils/common/playAudio";
export default useWalkthroughShow = (
  globalState,
  { screenName = "", listOrder = 1 },
  audioArray,
  onLastStepExecute = null,
  prevStepOrder = 0
) => {
  const { start, stop, walkthroughEvents, currentStep } = useWalkthrough();
  const walkthroughObj = useSelector((state) => selectWalkthroughSliceByScreenNameAndListOrder(state, screenName, listOrder));
  const [showWalkthrough, setShowWalkthrough] = useState(walkthroughObj?.show || false); //change true to the state in the storage
  const [isFirstEncounterEver] = useState(walkthroughObj?.show || false);
  //const [sound, setSound] = useState(null);
  useEffect(() => {
    let sound = undefined;
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
      if (typeof onLastStepExecute === "function") {
        onLastStepExecute();
      }
    };
    async function walkthroughOnStepChanged(step) {
      if (step?.order == prevStepOrder) return;
      prevStepOrder++; //why prevStepOrder? some wierd behaviour when i move from gamescreen to persons screen first walkthrough will be fired here 6 times???? (why? my code or my guess is something to do with copilot registering stuff)

      if (sound?.stopAsync) {
        await sound.stopAsync();
      }
      if (audioArray?.length <= 0 || typeof audioArray[step.order - 1] !== "function") return;
      sound = await playAudio(audioArray[step.order - 1], false);
      if (sound) {
        await sound.playAsync();
      }
    }

    walkthroughEvents.on("stop", walkthroughOnStop);
    walkthroughEvents.on("stepChange", walkthroughOnStepChanged);
    return () => {
      walkthroughEvents.off("stop", walkthroughOnStop);
      walkthroughEvents.off("stepChange", walkthroughOnStepChanged);
      if (sound?.unloadAsync) {
        sound.unloadAsync();
      }
    };
  }, [showWalkthrough]);
  return {
    showWalkthrough,
    // setShowWalkthrough,
    startWalkthrough: start,
    isFirstEncounterEver,
    // stopWalkthrough: stop,
  };
};
