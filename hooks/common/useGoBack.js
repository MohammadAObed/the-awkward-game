import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

const useGoBack = () => {
  const navigation = useNavigation();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        // navigation.dispatch(e.data.action); // remove the prevention
      }),
    [navigation]
  );
  return { navigation };
};

export default useGoBack;
