import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { globalState } from "../../global/GameScreen";
import { getRandomNumber } from "../../utils/common/getRandomNumber";
import { initialState } from "../../initials/GameScreen";

const PersonLineComponent = () => {
  const hasHandshakeMatched = globalState.selectedPlayerHandshake.id === globalState.selectedPersonHandshake.id;
  const greeting = useMemo(() => {
    const personLines = globalState.person.lines[globalState.personMood.name]() || [];
    return personLines[getRandomNumber(personLines?.length || 0)];
  }, [globalState.timesPlayed, globalState.timesPlayed == initialState.timesPlayed]);

  return (
    <View className="h-40 mb-2 flex justify-center -z-10">
      <View className="h-fit space-y-2 flex items-center bg-black-600 p-5 pt-7">
        <Text className="text-xl text-white text-center">
          {!hasHandshakeMatched && (globalState.isFirstEncounterEver || globalState.achievementResult.showAchievement) && "No Problem! "}{" "}
          {greeting}
        </Text>
        {(globalState.isFirstEncounterEver || globalState.personHadEnough) && (
          <Text className="text-center text-xl text-yellow-500">{globalState.person.signatureLine}</Text>
        )}
      </View>
    </View>
  );
};

export default PersonLineComponent;
