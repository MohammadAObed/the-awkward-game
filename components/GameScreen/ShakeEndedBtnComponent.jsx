import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const ShakeEndedBtnComponent = ({ handlePress, btnText = "" }) => {
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
        <TouchableOpacity onPress={handlePress} className="z-50 py-2 px-9 bg-yellow-500 rounded-md flex-row items-center justify-center">
          <Text className="to-black-700">{btnText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ShakeEndedBtnComponent;
