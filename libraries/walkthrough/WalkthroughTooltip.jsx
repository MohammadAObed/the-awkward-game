import React from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useCopilot } from "react-native-copilot";

//Prev and Skip buttons are hidden using tailwind
export const WalkthroughTooltip = ({ labels }) => {
  const { goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep } = useCopilot();

  const handleStop = () => {
    void stop();
  };
  const handleNext = () => {
    void goToNext();
  };

  const handlePrev = () => {
    void goToPrev();
  };

  return (
    <View className="flex justify-center items-center ">
      <View className="">
        <Text testID="stepDescription" className="text-white text-center leading-5 mb-3 text-lg">
          {currentStep?.text}
        </Text>
      </View>
      <View className="bg-blue-00">
        {!isLastStep ? (
          <TouchableOpacity onPress={handleStop} className="py-3 px-20 bg-yellow-500 rounded-md flex-row items-center justify-center hidden">
            <Text className="text-lg">{labels.skip}</Text>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev} className="py-3 px-20 bg-yellow-500 rounded-md flex-row items-center justify-center hidden">
            <Text className="text-lg">{labels.previous}</Text>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext} className="py-3 px-20 bg-yellow-500 rounded-md flex-row items-center justify-center">
            <Text className="text-lg">{labels.next}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop} className="py-3 px-20 bg-yellow-500 rounded-md flex-row items-center justify-center">
            <Text className="to-black-700 text-lg">{labels.finish}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
