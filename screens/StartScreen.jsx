import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import useModal from "../hooks/common/useModal";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ScreenNames } from "../constants/ScreenNames";
import { GameType } from "../constants/GameScreen";
import { useDispatch, useSelector } from "react-redux";
import { selectWalkthroughSliceByScreenNameAndListOrder, walkthroughReset, walkthroughUpdate } from "../features/walkthroughSlice";
import { meterReset } from "../features/PersonMeterSlice";
import { playerAchievementReset } from "../features/PlayerAchievementSlice";
import EmptyModal from "../components/common/EmptyModal";
import TabsModal from "../components/common/TabsModal";
import { settingsReset } from "../features/SettingsSlice";

const StartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //Temp
  //dispatch(walkthroughReset({}));
  //dispatch(meterReset({}));
  //dispatch(playerAchievementReset({}));
  //dispatch(settingsReset({}));
  //
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { modalVisible, showModal, hideModal } = useModal();
  const { modalVisible: volumeModalVisible, showModal: showVolumeModal, hideModal: hideVolumeModal } = useModal();
  const screenIsFocused = useIsFocused();

  const walkthroughObj = useSelector((state) => selectWalkthroughSliceByScreenNameAndListOrder(state, ScreenNames.StartScreen, 1));
  const [showWalkthrough, setShowWalkthrough] = useState(walkthroughObj?.show || false);
  const [isFirstEncounterEver] = useState(walkthroughObj?.show || false);
  const shakeBtnOnClick = (e) => {
    if (isFirstEncounterEver !== true) {
      leaveScreen();
    }
    dispatch(
      walkthroughUpdate({
        screenName: ScreenNames.StartScreen,
        listOrder: 1,
        show: false,
      })
    );
    setShowWalkthrough((prev) => false);
    showVolumeModal();
  };

  const leaveScreen = (e) => {
    if (showWalkthrough === true) return;
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNames.GameScreen, params: { gameType: GameType.QUICK } }], //helps performance, bcz it kills this screen so the video won't keep playing in the background when on the GameScreen,
    });
  };
  return (
    <View className="flex-1 bg-black-700">
      {!videoLoaded && <ImageFirstFrameOfVideoComponent />}
      <BgVideoComponent setVideoLoaded={setVideoLoaded} screenIsFocused={screenIsFocused} />
      <ShadeComponent />
      <ContentComponent shakeBtnOnClick={shakeBtnOnClick} />
      <FooterComponent showModal={showModal} />
      {modalVisible && ( //for faster performance
        <TabsModal hideModal={hideModal} modalVisible={modalVisible} />
      )}
      <EmptyModal hideModal={() => {}} modalVisible={isFirstEncounterEver && volumeModalVisible} shadeOpacity={0.9}>
        <VolumeUpComponent leaveScreen={leaveScreen}></VolumeUpComponent>
      </EmptyModal>
    </View>
  );
};

export default StartScreen;

const ImageFirstFrameOfVideoComponent = () => {
  return <Image source={require("../assets/images/VideoFirstFrame.jpg")} className="absolute w-full h-full left-0 top-0" />;
};

const BgVideoComponent = ({ setVideoLoaded, screenIsFocused }) => {
  return (
    <Video
      source={require("../assets/Video/AwkwardVideoCompressed.mp4")}
      className="absolute w-full h-full left-0 top-0"
      resizeMode={ResizeMode.COVER}
      shouldPlay={screenIsFocused} //It pauses the video if we are not on the start screen, helps performance (anyway But used navigation.reset so it kills this screen and takes the next screen as the new screen (index 0))
      isLooping
      onLoad={() => setVideoLoaded(true)}
    ></Video>
  );
};

const ShadeComponent = () => {
  return <SafeAreaView className="absolute bg-[#00000099] w-full h-full left-0 top-0" />;
};

const ContentComponent = ({ shakeBtnOnClick = function () {} }) => {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center px-5 mt-10">
      <Text className="text-white text-3xl font-bold w-60 text-center mt-10">Get Awkward !</Text>
      <TouchableOpacity
        className="bg-yellow-500 w-full h-16 my-5 rounded-md flex-row items-center justify-center space-x-4"
        onPress={shakeBtnOnClick}
      >
        <Text className="text-black-700 text-lg text-center font-bold">Start shaking</Text>
        <Text className="text-xl">🤝</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const FooterComponent = ({ showModal }) => {
  return (
    <TouchableOpacity onPress={showModal} className="h-10 mb-5 flex-row items-center justify-center px-5">
      <Text className="text-xl text-white opacity-75">Prepare</Text>
      <Text className="text-md text-white ml-2 opacity-70">?</Text>
    </TouchableOpacity>
  );
};

const VolumeUpComponent = ({ leaveScreen = function () {} }) => {
  return (
    <View className=" flex items-center justify-end -mt-16">
      <Image className="w-72 h-40" source={require("../assets/images/volumeUp.gif")} />
      <Text className="mt-5 text-white w-72 text-center text-lg">
        Volume up for better <Text className="line-through">experience</Text> <Text className="text-yellow-500">awkwardness</Text>
      </Text>
      <TouchableOpacity className="bg-yellow-500 py-3 px-14 rounded-md mt-5 w-full" onPress={leaveScreen}>
        <Text className=" text-black-500 text-center">Ok 👌</Text>
      </TouchableOpacity>
    </View>
  );
};
