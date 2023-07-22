import { View, Text, Switch } from "react-native";
import React, { Children, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const toggleSwitch = (e, isEnabled) => {
    // alert(isEnabled);
  };
  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <SettingComponent title={"Settings"}>
        <SettingItemComponent name="AI Voice">
          <AIVoiceComponent toggleSwitch={toggleSwitch} />
        </SettingItemComponent>
      </SettingComponent>
    </SafeAreaView>
  );
};

const SettingComponent = ({ title, children }) => {
  return (
    <View className="mt-2 flex space-y-2">
      <Text className="text-xl text-yellow-500">{title}</Text>
      {children}
    </View>
  );
};

const SettingItemComponent = ({ name, children }) => {
  return (
    <View className="p-2 rounded-md mt-5 flex-row items-center justify-between bg-black-500">
      <Text className="text-lg text-white">{name}</Text>
      {children}
    </View>
  );
};

const AIVoiceComponent = ({ toggleSwitch }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <>
      <Switch
        trackColor={{ false: "#767577", true: "#525225" }}
        thumbColor={isEnabled ? "#F4C41C" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(e) => {
          toggleSwitch(e, !isEnabled);
          setIsEnabled((prev) => !prev);
        }}
        value={isEnabled}
      />
    </>
  );
};

export default SettingsScreen;
