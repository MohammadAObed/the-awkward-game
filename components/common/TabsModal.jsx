import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

export const TabsEnum = { ABOUT: 1, HINT: 2, CREDITS: 3 };
const Tabs = [
  {
    id: TabsEnum.ABOUT,
    title: "About",
    ContentComponenet: () => <AboutTabContentComponent />, //for a custom component, a function that returns it is the solution (wont take it directly without a function)
  },
  {
    id: TabsEnum.HINT,
    title: "Hints",
    ContentComponenet: () => <HintsTabContentComponent />,
  },
  {
    id: TabsEnum.CREDITS,
    title: "Credits",
    ContentComponenet: () => <CreditsTabContentComponent />,
  },
];

export function TabsModal({
  modalVisible,
  hideModal,
  children,
  showFooter,
  extraStyle = "",
  selectedTab = TabsEnum.ABOUT,
  showCredits = false,
}) {
  return (
    <Modal visible={modalVisible} animationType="none" onRequestClose={hideModal} transparent statusBarTranslucent={true}>
      <View className="relative flex-1 flex-row items-center justify-center">
        <ShadeComponent hideModal={hideModal} />
        <View className={`bg-black-600 z-50 flex rounded-sm ${extraStyle}`}>
          <ExitButtonComponent hideModal={hideModal} />
          {children || <TabsComponent selected={selectedTab} showCredits={showCredits} />}
          <FooterComponent showFooter={showFooter} />
        </View>
      </View>
    </Modal>
  );
}

export default TabsModal;

const ShadeComponent = ({ hideModal }) => {
  return <TouchableOpacity className="absolute w-full h-full bg-[#11111199]" onPress={hideModal} />;
};

const ExitButtonComponent = ({ hideModal }) => {
  return (
    <TouchableOpacity className="absolute top-0 right-0 p-3 z-10 " onPress={hideModal}>
      <XMarkIcon size={32} color="#333" />
    </TouchableOpacity>
  );
};

const TabsComponent = ({ selected = TabsEnum.ABOUT, showCredits = false }) => {
  const [selectedTab, setSelectedTab] = useState(selected);
  const SelectedTab = Tabs.find((tab) => tab.id === selectedTab);
  const tabsList = showCredits ? Tabs : [Tabs[0], Tabs[1]];
  return (
    <View className=" h-72 w-80 bg-black-500 shadow-md rounded-sm ">
      <View className="flex-row mt-1.5 z-10 border-b-black-700 border-b-8">
        {tabsList.map((Tab) => (
          <TabComponenet key={Tab.id} {...Tab} isSelected={selectedTab == Tab.id && true} setSelectedTab={setSelectedTab} resize={showCredits} />
        ))}
      </View>
      <ScrollView className="flex-1 bg-black-700 py-4">{SelectedTab.ContentComponenet()}</ScrollView>
    </View>
  );
};

const TabComponenet = ({ id, title, isSelected = false, setSelectedTab, resize = false }) => {
  return (
    <Pressable
      className={`mr-1 bg-black-700 rounded-md px-2 py-2 translate-y-1 ${isSelected ? `border-b-black-700 border-b-4` : `bg-transparent`}`}
      style={{ width: resize ? 90 : 120 }}
      onPress={() => setSelectedTab(id)}
    >
      <Text className={`text-center text-lg text-white ${!isSelected && `opacity-50`}`}>{title}</Text>
    </Pressable>
  );
};

const AboutTabContentComponent = () => {
  return (
    <View className="pb-4">
      <View className="bg-black-500 px-2 py-2 w-full mb-4">
        <Text className="text-white leading-6" style={{ fontSize: 15 }}>
          <Text className="font-bold text-yellow-500">Remember</Text> the last time you awkwardly shook hands with someone, it was so
          embarrassing, and you might thought about it after, well, lets experience this a thousand times more. Haha don't worry, you'll laugh
          about it...
        </Text>
      </View>
      <View className="bg-black-500 px-2 py-2 w-full">
        <Text className="text-yellow-500 leading-6 font-bold" style={{ fontSize: 15 }}>
          How To Play?
        </Text>
        <Text className="text-white leading-6 mt-1" style={{ fontSize: 15 }}>
          Choose a character, handshake! if you snooze you lose, if you match you cruise
        </Text>
      </View>
    </View>
  );
};

const HintsTabContentComponent = () => {
  return (
    <View>
      <View className="bg-black-500 px-2 py-2 w-full mb-4">
        <Text className="text-yellow-500 leading-6 font-bold" style={{ fontSize: 15 }}>
          Characters
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          - Try to be a friend with the character, The bar indicates level of friendship 🤝‍🧑
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          - Bar 📏 decreases or increses by matching a handshake or unlocking an achievment
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          - Each character has a signature handshake 🤝
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          - If you match certain conditions, you get an achievment 🌟 with a sticker
        </Text>
      </View>
    </View>
  );
};

const FooterComponent = ({ showFooter }) => {
  return (
    <View className="items-center justify-center px-5 mt-5 mb-3">
      {showFooter === true && <Text className="text-sm opacity-70 text-yellow-500">By Mohammad Obed &#169;</Text>}
    </View>
  );
};

const CreditsTabContentComponent = () => {
  return (
    <View>
      <View className="bg-black-500 px-2 py-2 w-full mb-4">
        <Text className="text-yellow-500 leading-6 font-bold" style={{ fontSize: 15 }}>
          Clout
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          🗣 Shout out to all the characters in the game
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          🔊 Shout out to all the great people I got my images and stickers from
        </Text>
      </View>
    </View>
  );
};
