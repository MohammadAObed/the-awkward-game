import { Modal, Pressable, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

export function EmptyModal({ modalVisible, hideModal, children, shadeOpacity = 0.5 }) {
  return (
    <Modal visible={modalVisible} animationType="none" onRequestClose={hideModal} transparent statusBarTranslucent={true}>
      <View className="relative flex-1 flex-row items-center justify-center">
        <ShadeComponent hideModal={hideModal} shadeOpacity={shadeOpacity} />
        {children || <CommonContainerComponent />}
      </View>
    </Modal>
  );
}

export default EmptyModal;

const ShadeComponent = ({ hideModal, shadeOpacity }) => {
  return <TouchableOpacity className="absolute w-full h-full bg-[#111111]" onPress={hideModal} style={{ opacity: shadeOpacity }} />;
};

const CommonContainerComponent = () => {
  return (
    <View className="absolute w-40 h-40 bg-black-500">
      <ExitButtonComponent hideModal={hideModal} />
    </View>
  );
};

const ExitButtonComponent = ({ hideModal }) => {
  return (
    <TouchableOpacity className="absolute top-0 right-0 p-3 z-10" onPress={hideModal}>
      <XMarkIcon size={32} color="#333" />
    </TouchableOpacity>
  );
};
