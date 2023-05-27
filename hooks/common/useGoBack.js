import React, { useEffect } from "react";

const initialOptions = {
  reset: false,
};

const useGoBack = (navigation, options = initialOptions) => {
  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      console.log("Not Working");
      e.preventDefault();
      // navigation.dispatch(e.data.action); // remove the prevention
    });
  }, [navigation]);
  return {};
};

export default useGoBack;
