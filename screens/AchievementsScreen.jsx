import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerAchievementByMethodName, selectPlayerAchievements } from "../features/PlayerAchievementSlice";
import { PlayerAchievement } from "../models/PlayerAchievement";
import persons from "../data/Person";
import EmptyModal from "../components/common/EmptyModal";
import useModal from "../hooks/common/useModal";
import { Person } from "../models/Person";
import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, PhoneIcon } from "react-native-heroicons/solid";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { useRoute } from "@react-navigation/native";
import { PlayerAchievementMethods } from "../models/PlayerAchievementMethods";
import { Setting, SettingsNames } from "../models/Setting";
import { selectSettingsByName, settingsUpdate } from "../features/SettingsSlice";
import { getRandomNumber } from "../utils/common/getRandomNumber";
import { playAudio } from "../utils/common/playAudio";
import { useAppContext } from "../components/common/AppContext";

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
  const [is100, setIs100] = useState(false);
  globalState.is100 = is100;
  globalState.setIs100 = setIs100;
  globalState.showModal = showModal;
  globalState.hideModal = hideModal;
  const initialAchievement = useSelector((state) => selectPlayerAchievementByMethodName(state, params?.methodName));
  const [achievement, setAchievement] = useState(initialAchievement);
  globalState.achievement = achievement;
  globalState.setAchievement = setAchievement;
  const [personId, setPersonId] = useState(params?.personId ?? 0);
  globalState.personId = personId;
  globalState.setPersonId = setPersonId;
  //#endregion
  let achievements = [new PlayerAchievement()];
  achievements = useSelector((state) => selectPlayerAchievements(state));
  let achievementsCompleted = useMemo(
    () =>
      achievements.reduce((acc, currentVal) => {
        return acc + (currentVal.hasUnlocked ? 1 : 0);
      }, 0),
    [achievements]
  );
  let achievementsPercentage = ((achievementsCompleted * 100) / achievements.length).toFixed(0);
  let settingsModel = new Setting();
  settingsModel = useSelector((state) => selectSettingsByName(state, SettingsNames.Reached100AchievmentsHidden));
  const dispatch = useDispatch();
  useEffect(() => {
    const showModalTimeout = setTimeout(() => {
      let showFireworks = false;
      if (achievementsCompleted === achievements.length) {
        if (settingsModel.value !== true) {
          dispatch(settingsUpdate({ id: settingsModel.id, value: true }));
          showFireworks = true;
          setIs100(true);
        }
      }
      if (params || showFireworks) showModal();
    }, 500);

    return () => {
      clearTimeout(showModalTimeout);
    };
  }, []);
  return (
    <SafeAreaView className="flex-1 px-5 bg-black-700">
      <SettingComponent title={`Stickers`} number={`${achievementsPercentage}%`}>
        <PersonsComponent achievements={achievements} />
        {modalVisible && (
          <EmptyModal hideModal={hideModal} modalVisible={modalVisible}>
            {is100 ? <FireworksComponent /> : <GifComponent />}
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
  const { playBtnSound } = useAppContext();
  const [downloadMsg, setDownloadMsg] = useState({ show: false, msg: "" });
  const [image, setImage] = useState(null);
  useEffect(() => {
    const img = PlayerAchievementMethods[globalState.achievement.methodName]?.requireImage();
    setImage(img);
  }, []);

  const handleDownloadSticker = async (img) => {
    try {
      const gavePermission = await askPermissions();
      if (!gavePermission) return;
      const asset = Asset.fromModule(img);
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const downloadPath = `${FileSystem.documentDirectory}${globalState.achievement.methodName}.${asset.type}`;
      await FileSystem.copyAsync({ from: fileUri, to: downloadPath }); //After a week of debugging in production apk build app, createAssetAsync wont work on a uri\localUri, because uri is just a name, (an identifier as stated on web in a github question, but copy in my experience the copy method will take this identifier just fine)
      await saveImageToAlbum(downloadPath);
      setDownloadMsg((prev) => ({ show: true, msg: "Album: The Awkward Stickers \n Download Completed!" }));
    } catch (error) {
      setDownloadMsg((prev) => ({ show: true, msg: "Download Failed!" }));
    }
  };

  const saveImageToAlbum = async (downloadPath) => {
    const mediaAsset = await MediaLibrary.createAssetAsync(downloadPath);
    const album = await MediaLibrary.getAlbumAsync("The Awkward Stickers");
    if (album === null) {
      await MediaLibrary.createAlbumAsync("The Awkward Stickers", mediaAsset, true); //false
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([mediaAsset], album, true); //false
    }
  };

  async function askPermissions() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Please Grant permission to download");
      return false;
    } else {
      return true;
    }
  }
  let lines = PlayerAchievementMethods[globalState.achievement.methodName]?.DisplayedMsg.split(PlayerAchievementMethods.MultiLineSepeartor);
  let showDownloadMsg = downloadMsg.show;
  return (
    <View className=" flex items-center">
      {!showDownloadMsg && <Image className="w-60 h-60" source={image} />}
      {showDownloadMsg ? (
        <Text className="mt-5 text-white w-72 text-center text-lg">{downloadMsg.msg}</Text>
      ) : lines.length > 1 ? (
        <>
          <Text className="mt-5 text-yellow-500 w-72 text-center text-lg">{lines[0]}</Text>
          <Text className="mt-2 text-white w-72 text-center text-lg">{lines[1]}</Text>
        </>
      ) : (
        <Text className="mt-5 text-white w-72 text-center text-lg">{lines.length == 1 ? lines[0] : ""}</Text>
      )}
      <View className="flex-row space-x-2">
        <TouchableOpacity
          className="bg-yellow-500 py-3 px-16 rounded-md mt-5"
          onPress={() => {
            showDownloadMsg ? globalState.hideModal() : handleDownloadSticker(image);
            playBtnSound();
          }}
        >
          <Text className=" text-black-500 text-center">{showDownloadMsg ? `Ok 👍` : `Download 👇`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FireworksComponent = () => {
  const soundRef = useRef(null);
  const fireworksRef = useRef(null);
  let settingsModel = new Setting();
  settingsModel = useSelector((state) => selectSettingsByName(state, SettingsNames.AiVoice));
  useEffect(() => {
    async function loadSound() {
      try {
        const audioArr = [
          require("../assets/audio/aiadam/hurraaaay.mp3"),
          require("../assets/audio/aiadam/hurrayBuddy.mp3"),
          require("../assets/audio/aiadam/congrats.mp3"),
        ];
        const fireworksSound = await playAudio(() => require("../assets/audio/fireworksShort.mp3"), true, -1, true);
        const newSound = settingsModel.value !== true ? null : await playAudio(() => audioArr, true, getRandomNumber(audioArr.length));
        soundRef.current = newSound;
        fireworksRef.current = fireworksSound;
      } catch (error) {
        //no need to display alert, its just sound
      }
    }
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (fireworksRef.current) {
        fireworksRef.current.unloadAsync();
      }
    };
  }, []);
  return (
    <TouchableOpacity
      className="w-full h-full flex justify-center"
      onPress={() => {
        globalState.hideModal();
        globalState.setIs100(false);
      }}
    >
      <Image className="w-full h-full absolute" source={require("../assets/images/fireworks.gif")} />
      <Text className="text-5xl text-yellow-500 text-center">100%</Text>
    </TouchableOpacity>
  );
};

export default AchievementsScreen;
