import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import useModal from "../hooks/common/useModal";
import AppModal from "../components/common/TabsModal";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ScreenNames } from "../constants/ScreenNames";

const StartScreen = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { modalVisible, showModal, hideModal } = useModal();
  const screenIsFocused = useIsFocused();
  return (
    <View className="flex-1 bg-black-700">
      {!videoLoaded && <ImageFirstFrameOfVideoComponent />}
      <BgVideoComponent setVideoLoaded={setVideoLoaded} screenIsFocused={screenIsFocused} />
      <ShadeComponent />
      <ContentComponent />
      <FooterComponent showModal={showModal} />
      {modalVisible && ( //for faster performance
        <AppModal hideModal={hideModal} modalVisible={modalVisible} showFooter={true} />
      )}
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

const ContentComponent = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center px-5 mt-10">
      <Text className="text-white text-3xl font-bold w-60 text-center mt-10">Get Awkward !</Text>
      <TouchableOpacity
        className="bg-yellow-500 w-full h-16 my-5 rounded-md flex-row items-center justify-center space-x-4"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "QuickGameRoundScreen" }], //helps performance, bcz it kills this screen so the video won't keep playing in the background when on the QuickGameRoundScreen,
          });
          //navigation.navigate(ScreenNames.QuickGameRoundScreen);
        }}
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
