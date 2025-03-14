import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useAppContext } from "../common/AppContext";

const ShakeEndedBtnComponent = ({ handlePress, btnText = "" }) => {
  const { playBtnSound } = useAppContext();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible((prev) => true);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {visible && (
        <TouchableOpacity
          onPress={(e) => {
            handlePress(e);
            playBtnSound();
          }}
          className="-mr-5 -ml-5 z-50 py-3 px-11 bg-yellow-500 rounded-md flex-row items-center justify-center translate-y-16"
        >
          <Text className="to-black-700">{btnText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ShakeEndedBtnComponent;
