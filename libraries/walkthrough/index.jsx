import { View, Text, Dimensions } from "react-native";
import React from "react";
import {
  CopilotStep,
  useCopilot,
  walkthroughable,
  CopilotProvider,
} from "react-native-copilot";
import { WalkthroughTooltip } from "./WalkthroughTooltip";

const MARGIN = Dimensions.get("window").width / 20;
const WIDTH = Dimensions.get("window").width - 2 * MARGIN;

const WalkthroughProvider = ({
  children,
  tooltipComponent = View,
  stepNumberComponent = View,
  animated = false,
  arrowColor = "#212121",
}) => {
  return (
    <CopilotProvider
      tooltipComponent={tooltipComponent}
      tooltipStyle={{
        backgroundColor: "transparent",
        width: WIDTH,
        maxWidth: WIDTH,
        left: MARGIN,
        paddingTop: 2,
      }}
      animated={animated}
      stepNumberComponent={stepNumberComponent}
      arrowColor={arrowColor}
      // margin={-305}
    >
      {children}
    </CopilotProvider>
  );
};

const WalkthroughStep = ({ text, order, name, children }) => {
  return (
    <CopilotStep text={text} order={order} name={name}>
      {children}
    </CopilotStep>
  );
};

const useWalkthrough = () => {
  const {
    registerStep,
    unregisterStep,
    currentStep,
    start,
    stop,
    goToNext,
    goToNth,
    goToPrev,
    visible,
    copilotEvents,
    isFirstStep,
    isLastStep,
    currentStepNumber,
  } = useCopilot();

  return {
    registerStep,
    unregisterStep,
    currentStep,
    start,
    stop,
    goToNext,
    goToNth,
    goToPrev,
    visible,
    copilotEvents,
    isFirstStep,
    isLastStep,
    currentStepNumber,
  };
};

export {
  WalkthroughProvider,
  WalkthroughStep,
  useWalkthrough,
  walkthroughable,
  WalkthroughTooltip,
};
