import { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

const TabsEnum = { ABOUT: 1, HINT: 2 };
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
];

export function AppModal({ modalVisible, hideModal, children, showFooter }) {
  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      onRequestClose={hideModal}
      transparent
      statusBarTranslucent={true}
    >
      <View className="relative flex-1 items-center justify-center">
        <ShadeComponent hideModal={hideModal} />
        <View className="w-80 h-80 bg-black-700 z-50 flex rounded-sm">
          <ExitButtonComponent hideModal={hideModal} />
          <TabsComponent />
          {showFooter && <FooterComponent />}
        </View>
      </View>
    </Modal>
  );
}

export default AppModal;

const ShadeComponent = ({ hideModal }) => {
  return (
    <TouchableOpacity
      className="absolute w-full h-full bg-[#11111199]"
      onPress={hideModal}
    />
  );
};

const ExitButtonComponent = ({ hideModal }) => {
  return (
    <TouchableOpacity
      className="absolute top-0 right-0 p-3 z-10"
      onPress={hideModal}
    >
      <XMarkIcon size={32} color="#333" />
    </TouchableOpacity>
  );
};

const TabsComponent = () => {
  const [selectedTab, setSelectedTab] = useState(TabsEnum.ABOUT);
  const SelectedTab = Tabs.find((tab) => tab.id === selectedTab);
  return (
    <View className="flex-1 bg-black-600 shadow-md rounded-sm">
      <View className="flex-row mt-2.5 z-10 mx-1">
        {Tabs.map((Tab) => (
          <TabComponenet
            key={Tab.id}
            {...Tab}
            isSelected={selectedTab == Tab.id && true}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </View>
      <ScrollView className="flex-1 bg-black-500 py-4">
        {SelectedTab.ContentComponenet()}
      </ScrollView>
    </View>
  );
};

const TabComponenet = ({ id, title, isSelected = false, setSelectedTab }) => {
  return (
    <Pressable
      className={`mr-1 bg-black-500 w-28 rounded-md px-2 py-2 translate-y-1 ${
        isSelected ? `border-b-black-500 border-b-4` : `bg-transparent`
      }`}
      onPress={() => setSelectedTab(id)}
    >
      <Text
        className={`text-center text-lg text-white ${
          !isSelected && `opacity-50`
        }`}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const AboutTabContentComponent = () => {
  return (
    <View>
      <View className="bg-black-600 px-2 py-2 w-full mb-4">
        <Text className="text-white leading-6" style={{ fontSize: 15 }}>
          <Text className="font-bold text-yellow-500">Remember</Text> the last
          time you awkwardly shook hands with someone, it was so embarrassing,
          and you might thought about it after, well, lets experience this a
          thousand times more. Haha don't worry, you'll laugh about it...
        </Text>
      </View>
      <View className="bg-black-600 px-2 py-2 w-full">
        <Text
          className="text-yellow-500 leading-6 font-bold"
          style={{ fontSize: 15 }}
        >
          How To Play?
        </Text>
        <Text
          className="text-gray-700 leading-6 mt-2"
          style={{ fontSize: 15 }}
        ></Text>
      </View>
    </View>
  );
};

const HintsTabContentComponent = () => {
  return (
    <View>
      <View className="bg-black-600 px-2 py-2 w-full mb-4">
        <Text
          className="text-yellow-500 leading-6 font-bold"
          style={{ fontSize: 15 }}
        >
          Characters
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          - Each Character Has A higher occurance of a specific handshake
        </Text>
        <Text className="text-white leading-6 mt-2" style={{ fontSize: 15 }}>
          - You will get rewards for unlocking handhshakes
        </Text>
      </View>
    </View>
  );
};

const FooterComponent = ({ showModal }) => {
  return (
    <View className="items-center justify-center px-5 mt-5 mb-3">
      <Text className="text-sm opacity-70 text-yellow-500">
        By Mohammad Obed &#169;
      </Text>
    </View>
  );
};
