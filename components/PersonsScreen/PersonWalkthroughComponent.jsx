import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Person } from "../../models/Person";
import { WalkthroughStep, walkthroughable } from "../../libraries/walkthrough";
import PersonImageComponent from "./PersonImageComponent";
import PersonBarWalkthroughComponent from "./PersonBarWalkthroughComponent";
import { PhoneIcon, QuestionMarkCircleIcon } from "react-native-heroicons/solid";
import { GameType } from "../../constants/GameScreen";
import { ScreenNames } from "../../constants/ScreenNames";
import { globalState } from "../../global/PersonsScreen";
import useModal from "../../hooks/common/useModal";
import TabsModal, { TabsEnum } from "../../components/common/TabsModal";

const WalkthroughView = walkthroughable(View);

const PersonWalkthroughComponent = ({ person = new Person(), isWalkthrough = false, isHelp = false }) => {
  return (
    <>
      {isWalkthrough ? (
        <WalkthroughStep text={`Click on a contact to meet a friend`} order={1} name="First">
          <WalkthroughView>
            <PersonComponent key={person.id} person={person} isWalkthrough={true} />
          </WalkthroughView>
        </WalkthroughStep>
      ) : isHelp ? (
        <HelpComponent />
      ) : (
        <PersonComponent key={person.id} person={person} />
      )}
    </>
  );
};

const PersonComponent = ({ person = new Person(), isWalkthrough }) => {
  const navigateToGame = () => {
    if (globalState.showWalkthrough === true) {
      return;
    }
    globalState.navigation.reset({
      index: 0,
      routes: [{ name: ScreenNames.GameScreen, params: { gameType: GameType.NORMAL, personId: person.id } }], //testing bcs personmood is funky, and when console logging here in this screen, and update some state in my gamescreen, the log here is called, wtf bitch
    });
    //globalState.navigation.navigate(ScreenNames.GameScreen, { gameType: GameType.NORMAL, personId: person.id });
  };
  return (
    <TouchableOpacity className="p-2 rounded-xl bg-black-500 mt-5 flex-row justify-between items-center" onPress={navigateToGame}>
      <View className="flex-row items-center space-x-2">
        <PersonImageComponent person={person} />
        <View className="">
          <Text className="text-white mb-2">{person.name}</Text>
          {<PersonBarWalkthroughComponent isWalkthrough={isWalkthrough} person={person} />}
        </View>
      </View>

      <TouchableOpacity className="p-2" onPress={navigateToGame}>
        <PhoneIcon size={23} color={"gray"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const HelpComponent = () => {
  const showHelp = (e) => {};
  const { hideModal, modalVisible, showModal } = useModal();
  return (
    <>
      <TouchableOpacity className="p-2 rounded-xl bg-black-500 mt-5 flex-row justify-center items-center" onPress={showModal}>
        <TouchableOpacity className="p-2" onPress={showModal}>
          <QuestionMarkCircleIcon size={40} color={"gray"} />
        </TouchableOpacity>
      </TouchableOpacity>
      {modalVisible && ( //for faster performance
        <TabsModal hideModal={hideModal} modalVisible={modalVisible} selectedTab={TabsEnum.HINT} showCredits={true} />
      )}
    </>
  );
};

export default PersonWalkthroughComponent;
