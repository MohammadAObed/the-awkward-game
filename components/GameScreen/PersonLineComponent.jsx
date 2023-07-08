import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { globalState } from "../../global/GameScreen";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { initialState } from "../../initials/GameScreen";

const PersonLineComponent = () => {
  const hasHandshakeMatched = globalState.selectedPlayerHandshake.id === globalState.selectedPersonHandshake.id;
  const greeting = useMemo(
    () =>
      hasHandshakeMatched || globalState.achievementResult.showAchievement || globalState.isFirstEncounterEver
        ? globalState.person.greetings.positive[getRandomNumber(globalState.person.greetings.positive.length)]
        : globalState.person.greetings.negative[getRandomNumber(globalState.person.greetings.negative.length)],
    [globalState.timesPlayed, globalState.timesPlayed == initialState.timesPlayed]
  );

  return (
    <View className="h-fit mb-6 space-y-2 flex items-center bg-black-600 p-5 pt-7">
      <Text className="text-xl text-white text-center">
        {!hasHandshakeMatched && globalState.isFirstEncounterEver && "No Problem! "} {greeting}
      </Text>
      {(globalState.isFirstEncounterEver || globalState.personHadEnough) && (
        <Text className="text-center text-xl text-yellow-500">{globalState.person.signatureLine}!</Text>
      )}
    </View>
  );
};

export default PersonLineComponent;
