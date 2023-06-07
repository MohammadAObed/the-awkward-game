import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectPlayerAchievements } from "../features/PlayerAchievementSlice";
import { PlayerAchievement, PlayerAchievementMethods } from "../models/PlayerAchievement";
import persons from "../data/Person";
import EmptyModal from "../components/common/EmptyModal";
import useModal from "../hooks/common/useModal";
import { Person } from "../models/Person";
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, PhoneIcon } from "react-native-heroicons/solid";

const globalState = {
  showModal: function () {},
  setAchievement: function () {},
  achievement: new PlayerAchievement(),
  personId: persons[0],
  setPersonId: function () {},
};

const AchievementsScreen = () => {
  //#region globalState
  const { hideModal, modalVisible, showModal } = useModal();
  globalState.showModal = showModal;
  const [achievement, setAchievement] = useState();
  globalState.achievement = achievement;
  globalState.setAchievement = setAchievement;
  const [personId, setPersonId] = useState();
  globalState.personId = personId;
  globalState.setPersonId = setPersonId;
  //#endregion
  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <SettingComponent title={"Gifs"}>
        <PersonsComponent />
        <EmptyModal hideModal={hideModal} modalVisible={modalVisible}>
          <GifComponent />
        </EmptyModal>
      </SettingComponent>
    </SafeAreaView>
  );
};

const SettingComponent = ({ title, children }) => {
  return (
    <View className="mt-2 flex space-y-2">
      <Text className="text-lg text-yellow-500">{title}</Text>
      {children}
    </View>
  );
};

const PersonsComponent = () => {
  let achievements = [new PlayerAchievement()];
  achievements = useSelector((state) => selectPlayerAchievements(state));
  return (
    <View>
      {persons.map((p) => {
        let personAchievements = achievements.filter((a) => a.personId == p.id);
        if (personAchievements.length > 0) {
          let w = new PlayerAchievement(2, persons[0], "TheEyebrow");
          let w2 = new PlayerAchievement(3, persons[0], "TheEyebrow");
          let w3 = new PlayerAchievement(4, persons[0], "TheEyebrow");
          personAchievements.push(w, w2, w3);
        }
        return <PersonComponent key={p.id} personAchievements={personAchievements} person={p} />;
      })}
    </View>
  );
};

const PersonComponent = ({ personAchievements = [new PlayerAchievement()], person = new Person() }) => {
  const isSelected = person.id === globalState.personId;
  return (
    <View className="flex mt-2">
      <TouchableOpacity
        className="bg-black-500 p-2 flex-row items-center space-x-2"
        onPress={() => globalState.setPersonId((prev) => person.id)}
      >
        {!isSelected ? <ChevronRightIcon size={15} color={"white"} /> : <ChevronDownIcon size={15} color={"white"} />}
        <Text className={`text-white ${isSelected && "opacity-80 text-yellow-500"}`}>{person.name}</Text>
      </TouchableOpacity>

      {isSelected && (
        <ScrollView className="flex-row bg-black-600 px-2 py-2" horizontal>
          {personAchievements.length > 0 && personAchievements.map((pa) => <AchievementComponent key={pa.id} personAchievement={pa} />)}
        </ScrollView>
      )}
    </View>
  );
};

const AchievementComponent = ({ personAchievement = new PlayerAchievement() }) => {
  function handleGifOnPress() {
    globalState.setAchievement((prev) => personAchievement);
    globalState.showModal();
  }
  return (
    <TouchableOpacity onPress={handleGifOnPress}>
      <Image className="w-24 h-20 mr-2" source={PlayerAchievementMethods[personAchievement.methodName]?.image} />
    </TouchableOpacity>
  );
};

const GifComponent = ({ leaveScreen = function () {} }) => {
  return (
    <View className=" flex items-center">
      <Image className="w-56 h-52" source={PlayerAchievementMethods[globalState.achievement.methodName]?.image} />
      <Text className="mt-5 text-white w-72 text-center text-lg">
        {PlayerAchievementMethods[globalState.achievement.methodName]?.DisplayedMsg}
      </Text>
      <View className="flex-row space-x-2">
        <TouchableOpacity className="bg-yellow-500 py-2 px-9 rounded-md mt-5">
          <Text className=" text-black-500 text-center">Download 👇</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-yellow-500 py-2 px-9 rounded-md mt-5 flex-row items-center space-x-2">
          <Text className=" text-black-500 text-center">Add to WhatsApp</Text>
          <PhoneIcon size={18} color={"green"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AchievementsScreen;
