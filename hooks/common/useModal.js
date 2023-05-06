import { useCallback, useRef, useState } from "react";

const useModal = (initialModalVisible = false) => {
  const [modalVisible, setModalVisible] = useState(initialModalVisible);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  return { modalVisible, showModal, hideModal };
};

export default useModal;
