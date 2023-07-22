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
        <TouchableOpacity
          onPress={handlePress}
          className="-mr-1 -ml-1 z-50 py-3 px-11 bg-yellow-500 rounded-md flex-row items-center justify-center"
        >
          <Text className="to-black-700">{btnText}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ShakeEndedBtnComponent;
