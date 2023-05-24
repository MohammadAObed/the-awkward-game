//Works With globalState object (gs)

//Notes:
//1- Order Of useGlobalState Call is important! bcz a custom hook may be using a state that is defined after that hook
import React from "react";

//! 1-for later: try put useMemo for global state property variable assignment
const useGlobalState = (globalState, cb, args, valueName, setValueName, isObjReturned = false) => {
  //mostly for custom hooks that return objects
  if (isObjReturned === true) {
    var obj = cb(...args);
    const keys = Object.keys(obj);
    keys.forEach((key, index) => {
      globalState[key] = obj[key];
    });
    //mostly for useState or any hook that returns an array of two
  } else {
    const [val, setVal] = cb(...args);
    globalState[valueName] = val;
    globalState[setValueName] = setVal;
  }
  //(if,else)used for performance, i dont have to loop for valueName and setValueName, only for obj
  return;
};

export default useGlobalState;
