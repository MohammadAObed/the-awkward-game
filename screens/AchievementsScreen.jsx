import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectPlayerAchievementByMethodName, selectPlayerAchievements } from "../features/PlayerAchievementSlice";
import { PlayerAchievement } from "../models/PlayerAchievement";
import persons from "../data/Person";
import EmptyModal from "../components/common/EmptyModal";
import useModal from "../hooks/common/useModal";
import { Person } from "../models/Person";
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, PhoneIcon } from "react-native-heroicons/solid";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { useRoute } from "@react-navigation/native";
import { PlayerAchievementMethods } from "../models/PlayerAchievementMethods";

const globalState = {
  showModal: function () {},
  hideModal: function () {},
  setAchievement: function () {},
  achievement: new PlayerAchievement(),
  personId: persons[0],
  setPersonId: function () {},
};

const AchievementsScreen = () => {
  const params = useRoute().params;
  //#region globalState
  const { hideModal, modalVisible, showModal } = useModal();
  globalState.showModal = showModal;
  globalState.hideModal = hideModal;
  const initialAchievement = useSelector((state) => selectPlayerAchievementByMethodName(state, params?.methodName));
  const [achievement, setAchievement] = useState(initialAchievement);
  globalState.achievement = achievement;
  globalState.setAchievement = setAchievement;
  const [personId, setPersonId] = useState(params?.personId ?? 0);
  globalState.personId = personId;
  globalState.setPersonId = setPersonId;
  let achievements = [new PlayerAchievement()];
  achievements = useSelector((state) => selectPlayerAchievements(state));
  let achievementsCompleted = useMemo(
    () =>
      achievements.reduce((acc, currentVal) => {
        return acc + (currentVal.hasUnlocked ? 1 : 0);
      }, 0),
    [achievements]
  );
  //#endregion
  useEffect(() => {
    const showModalTimeout = setTimeout(() => {
      if (params) showModal();
    }, 500);

    return () => {
      clearTimeout(showModalTimeout);
    };
  }, []);
  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <SettingComponent title={`Stickers`} number={`${(achievementsCompleted * 100) / achievements.length}%`}>
        <PersonsComponent achievements={achievements} />
        {modalVisible && (
          <EmptyModal hideModal={hideModal} modalVisible={modalVisible}>
            <GifComponent />
          </EmptyModal>
        )}
      </SettingComponent>
    </SafeAreaView>
  );
};

const SettingComponent = ({ title, number, children }) => {
  return (
    <View className="mt-2 flex space-y-2">
      <View className="flex-row justify-between">
        <Text className="text-xl text-yellow-500">{title}</Text>
        <Text className="text-xl text-yellow-500">{number}</Text>
      </View>
      {children}
    </View>
  );
};

const PersonsComponent = ({ achievements }) => {
  return (
    <ScrollView className="mb-12 mt-2">
      {persons.map((p) => {
        let personAchievements = achievements.filter((a) => a.personId == p.id);
        return <PersonComponent key={p.id} personAchievements={personAchievements} person={p} />;
      })}
    </ScrollView>
  );
};

const PersonComponent = ({ personAchievements = [new PlayerAchievement()], person = new Person() }) => {
  const isSelected = person.id === globalState.personId;
  const HowManyUnlocked = personAchievements.filter((pa) => pa.hasUnlocked).length;
  const textColor = isSelected ? "opacity-80 text-yellow-500" : "";
  return (
    <View className="flex mt-2">
      <TouchableOpacity
        className="bg-black-500 p-2 flex-row items-center space-x-2 "
        onPress={() => globalState.setPersonId((prev) => person.id)}
      >
        {!isSelected ? <ChevronRightIcon size={15} color={"white"} /> : <ChevronDownIcon size={15} color={"#F4C41C"} />}
        <Text className={`text-white ${textColor}`}>{person.name}</Text>
        <Text className={`text-white opacity-80 ${textColor}`}>{`${HowManyUnlocked}/${personAchievements.length}`}</Text>
      </TouchableOpacity>

      {isSelected && (
        <ScrollView className="flex-row bg-black-600 px-2 py-2" horizontal>
          {personAchievements.length > 0 &&
            personAchievements.map((pa) => {
              if (pa.hasUnlocked) return <AchievementComponent key={pa.id} personAchievement={pa} />;
            })}
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
      <Image className="w-24 h-20 mr-2" source={PlayerAchievementMethods[personAchievement.methodName]?.requireImage()} />
    </TouchableOpacity>
  );
};

const GifComponent = () => {
  const image = PlayerAchievementMethods[globalState.achievement.methodName]?.requireImage();

  async function handleDownload(image) {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Please Grant permission to download");
        return;
      }

      const asset = Asset.fromModule(image);
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const mediaAsset = await MediaLibrary.createAssetAsync(fileUri);

      const albumName = "The Awkward Game Stickers";
      const album = await MediaLibrary.getAlbumAsync(albumName);
      if (album === null) {
        albumAsset = await MediaLibrary.createAlbumAsync(albumName, mediaAsset);
      } else {
        albumAsset = await MediaLibrary.addAssetsToAlbumAsync([mediaAsset], album);
      }
      Alert.alert("Download completed!", "It's saved in The Awkward Game Stickers Album");
      globalState.hideModal();
    } catch (error) {
      Alert.alert("", "Download failed!");
    }
  }
  return (
    <View className=" flex items-center">
      <Image className="w-56 h-52" source={image} />
      <Text className="mt-5 text-white w-72 text-center text-lg">
        {PlayerAchievementMethods[globalState.achievement.methodName]?.DisplayedMsg}
      </Text>
      <View className="flex-row space-x-2">
        <TouchableOpacity className="bg-yellow-500 py-3 px-16 rounded-md mt-5" onPress={() => handleDownload(image)}>
          <Text className=" text-black-500 text-center">Download 👇</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AchievementsScreen;
