//- Works With globalState object (gs)
//- Order Of useGlobalState Call is important! bcz a custom hook may be using a state that is defined after that hook
import React, { useEffect } from "react";
import { nGlobalState } from "../../global/GameScreen";

//! 1-for later: try put useMemo for global state property variable assignment
const useGlobalState = (globalState, cb, args, valueName, setValueName, isObjReturned = false, stateIsObj = false) => {
  //mostly for custom hooks that return objects
  if (isObjReturned === true) {
    let obj = cb(...args);
    const keys = Object.keys(obj);
    keys.forEach((key, index) => {
      globalState[key] = obj[key];
    });
    //mostly for useState or any hook that returns an array of two
  } else {
    const [val, setVal] = stateIsObj ? cb(Object.assign({}, ...args)) : cb(...args);
    globalState[valueName] = val;
    globalState[setValueName] = setVal;
  }
  //(if,else)used for performance, i dont have to loop for valueName and setValueName, only for obj
  return;
};

export default useGlobalState;

//useGlobalState(globalState, useState, [initialState.hasShakeStarted], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
//above is equivelant to below:
//const [hasShakeEnded, setHasShakeEnded] = useState(false);
//globalState.hasShakeEnded = hasShakeEnded;
//globalState.setHasShakeEnded = setHasShakeEnded;

//useGlobalState(globalState, useState, [initialState.hasShakeStarted], nGlobalState.hasShakeStarted, nGlobalState.setHasShakeStarted);
//above is equivelant to below:
// const { showWalkthrough, startWalkthrough } = useWalkthroughShow(ScreenNames.GameScreen, 1);
// globalState.showWalkthrough = showWalkthrough;
// globalState.startWalkthrough = startWalkthrough;
